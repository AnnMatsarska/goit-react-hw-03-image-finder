import { SearchBar, Form, Button, Input } from './Searchbar.styled';

export const Searchbar = () => {
  return (
    <SearchBar>
      <Form>
        <Button type="submit">Search</Button>
        <Input
          type="text"
          name="searchQuery"
          autoComplete="off"
          autoFocus
          placeholder="Search images and photos"
        />
      </Form>
    </SearchBar>
  );
};
