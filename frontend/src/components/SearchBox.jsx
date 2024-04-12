import { useState } from "react";
import { Form, Button } from "react-bootstrap";
import { useParams, useNavigate } from "react-router-dom";


const SearchBox = () => {
  const navigate = useNavigate();
  const { keyword: urlKeyword } = useParams();
  const [keyword, setKeyword] = useState(urlKeyword || "");

  const submitHandler = (e) => {
    e.preventDefault();
    if (keyword){
        navigate(`/search/${keyword.trim()}`);  
    }else {
        navigate("/");
    }
  };
 
  return (
    <Form onSubmit={submitHandler} className='d-flex'>
        <Form.Control
        type="text"
        name="query"
        onChange={(e) => setKeyword(e.target.value)}
        value={keyword}
        placeholder="Search Products..."
        className="mr-sm-2 ml-sm-5 rounded-0 "
        ></Form.Control>
        <Button type="submit" variant='outline-success' className="mx-2 p-2 rounded-0 " style={{borderWidth: '2px'}}>
          Search
        </Button>
    </Form>
  )
};

export default SearchBox;
