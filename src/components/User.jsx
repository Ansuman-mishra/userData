import React, { Component } from 'react'
import {Button, Table} from 'antd';
import axios from 'axios';
import 'antd/dist/antd.css';

export default class User extends Component {
      constructor(props) {
            super(props);
            this.state = {
                  count: 1,
                  data: []
            }

      }
      columns = [
            {
              title: 'First Name',
              dataIndex: 'first_name',
              key: 'first_name',
            },
            {
              title: 'Last Name',
              dataIndex: 'last_name',
              key: 'last_name',
            },
            {
              title: 'Picture',
              dataIndex: "avatar",
              key: 'avatar',
              render: (data) => {
                    console.log(data);
                    return(
                          <img src={data} alt="" />
                    )
              }
            },
            {
              title: 'Email',
              dataIndex: 'email',
              key: 'email',
            },
      ]
      componentDidMount(){
            let getUrl = `https://reqres.in/api/users?page=${this.state.count}`
                  axios.get(getUrl).then((res, req)=>{
                        this.setState({
                              data: res.data
                        })
                        console.log(this.state.data);
                  }).catch((err)=>{
                        console.log(err);
                  })
      }
      componentDidUpdate(prevProps,prevState){
            if(prevState.data === this.state.data){
                  let getUrl = `https://reqres.in/api/users?page=${this.state.count}`
                  axios.get(getUrl).then((res, req)=>{
                        this.setState({
                              data: res.data
                        })
                        console.log(this.state.data);
                  }).catch((err)=>{
                        console.log(err);
                  })
            }
            
      }

      render() {
            let { data, count } = this.state
            console.log(count);
            return (
                  
            <>
                  <div className="group">
                  <Button
                        type="primary"
                        onClick={()=>{this.setState({count: count - 1 > 0 ? count - 1 :1 })}}
                  >pre </Button>
                  <Button
                        type="danger"
                        onClick={()=>{this.setState({count: count + 1})}}
                  >next 
                  </Button>
                  </div>
                  
                  <Table
                  columns={this.columns}
                  dataSource={data.data}
                  pagination={{ position: 'both' }}
                  />
                  
            </>
            )
      }
}
