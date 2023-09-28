import { Component } from 'react';
import { Searchbar } from './Searchbar/Searchbar';
import { Button } from './Button/Button';
export class App extends Component {
  state = {};

  render() {
    return (
      <>
        <Searchbar />
        <Button />
      </>
    );
  }
}
