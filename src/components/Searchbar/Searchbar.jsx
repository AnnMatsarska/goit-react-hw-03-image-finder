import { Component } from 'react';
import { Header, Form, Button, Input } from './Searchbar.styled';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { notifications } from '../notifications/notifications';

import { FaSearch } from 'react-icons/fa';

export class Searchbar extends Component {
  handleSubmit = evt => {
    const { onSubmit } = this.props;
    evt.preventDefault();
    const query = evt.target.elements.query.value.trim();
    onSubmit(query);

    if (query === '') {
      return toast.info('Please enter key words for search', notifications);
    }
  };

  render() {
    return (
      <Header>
        <Form onSubmit={this.handleSubmit}>
          <Button type="submit">
            <FaSearch />
          </Button>
          <Input
            type="text"
            name="query"
            autoComplete="off"
            autoFocus
            placeholder="Search images and photos"
          />
        </Form>
        <ToastContainer />
      </Header>
    );
  }
}
