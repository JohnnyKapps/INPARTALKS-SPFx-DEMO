import * as React from 'react';
import { ISearchToolProps } from './ISearchToolProps';
import { escape } from '@microsoft/sp-lodash-subset';
import * as style from './SearchTool.module.scss';

import pnp, { SearchResults } from 'sp-pnp-js';

export interface ISearchToolState {
  results?: SearchResults,
  message?: string,
  searchTerm?: string
}

export default class SearchTool extends React.Component<ISearchToolProps, ISearchToolState> {
  constructor() {
    super();

    this.state = {
      message: "",
      searchTerm: ""
    }

    this.getSearchResults = this.getSearchResults.bind(this);
    this.updateInputField = this.updateInputField.bind(this);
  }

  componentDidMount() {
    
  }

  getSearchResults() {
    this.setState({
      message: `Buscando por ${this.state.searchTerm}...`
    })
    pnp.sp.search(this.state.searchTerm)
    .then((results:SearchResults) => {
      this.setState({
        message: "",
        results: results
      });
    })
  }

  updateInputField(evt) {
    this.setState({
      searchTerm: evt.target.value
    });
  }
  

  public render(): React.ReactElement<ISearchToolProps> {
    return (
      <div className={style.default.container}>
        <h1>Search Tool</h1>
        <p>{ this.state.message }</p>
        <hr/>

        <div>
          <input type="text" onChange={ this.updateInputField }/>
          <a onClick={this.getSearchResults}>Buscar</a>
        </div>

        <div>
          {
            this.state.results &&
              this.state.results.PrimarySearchResults.map((item, index) => {
                return (
                  <div>
                    <h3>{item.Title}</h3>
                    <p>{item.Description}</p>
                    <p>Criado por {item.Author}</p>
                    <p>Modificado em{item.LastModifiedTime}</p>
                  </div>
                );
              })
          }
        </div>
      </div>
    );
  }
}
