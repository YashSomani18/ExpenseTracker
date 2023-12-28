import React ,{useState , useEffect} from "react";
import { Button, Form, Input , message} from "antd";
import { Link , useNavigate } from "react-router-dom";
import axios from 'axios';
import Spinner from '../components/Layout/Spinner'

const Register = () => {
    const navigate = useNavigate(); 
    const[loading , setLoading] = useState(false);
    const submitHandler = async(values) => {
    try {
        setLoading(true);
        const user = await axios.post('/api/v1/users/register',values);
        console.log(user);
        message.success("Registration Successful");
        setLoading(false);
        navigate('/login');
    } catch (error) {
        setLoading(false);
        message.error("Invalid Username or password"); 
    }
  };


  //prevent for login user
  useEffect(()=>{
    if(localStorage.getItem('user')){
        navigate('/');
    }
  },[navigate]);

  
  return (
    <>
      <div className="register-page">
        {loading && <Spinner/>}
        <Form layout="vertical" onFinish={submitHandler}>
          <h1>Register Page</h1>
          <Form.Item label="Name" name="name">
            <Input />
          </Form.Item>

          <Form.Item label="Email" name="email">
            <Input type="email" />
          </Form.Item>

          <Form.Item label="Password" name="password">
            <Input type="password" />
          </Form.Item>
          <div className="d-flex justify-content-between">
            <Link to="/login"> Already Registered? Click here to Login!</Link>
            <Button htmlType="submit" type="primary">
              Register
            </Button>
          </div>
        </Form>
      </div>
    </>
  );
};

export default Register;

