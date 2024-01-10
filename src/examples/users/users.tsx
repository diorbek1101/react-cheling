import React, { Component } from 'react';
import { Button, Modal, Table, Tag, Form, Input } from 'antd';
import { IEntity } from './types';
import * as Mappers from './mappers';
import Spinner from './spinner';

interface UsersState {
  users: IEntity.User[];
  isLoading: boolean;
  userId: string;
  isEditModalVisible: boolean;
  editingUser: IEntity.User | null;
}

export default class Users extends Component<any, UsersState> {
  state: UsersState = {
    users: [],
    isLoading: true,
    userId: '',
    isEditModalVisible: false,
    editingUser: null
  };

  onLoadUsers = async () => {
    try {
      this.setState({ isLoading: true });
      await new Promise(res => setTimeout(() => res(20), 500));

      const res = await fetch('https://jsonplaceholder.typicode.com/users');
      const data: any[] = await res.json();
      const users = (data || []).map(Mappers.User);
      this.setState({ users, isLoading: false });
    } catch (err) {
      this.setState({ isLoading: false });
    }
  };

  componentDidMount(): void {
    window.addEventListener('popstate', () => {
      console.log('pathname: ', window.location.pathname);
    });

    this.onLoadUsers();
  }

  onDelete = (userId: number) => {
    const userIdx = this.state.users.findIndex(c => c.id === userId);
    if (userIdx === -1) throw new Error('User not found');

    const users = [...this.state.users];
    users.splice(userIdx, 1);
    this.setState({ users });
  };

  onEdit = (userId: number) => {
    const userIdx = this.state.users.findIndex(c => c.id === userId);
    if (userIdx === -1) throw new Error('User not found');
    const editingUser = this.state.users[userIdx];

    this.setState({ editingUser, isEditModalVisible: true });
  };

  onInfo = (userId: number) => {
    const userIdx = this.state.users.findIndex(c => c.id === userId);
    if (userIdx === -1) throw new Error('User not found');
    const users = [this.state.users[userId - 1]];
    this.setState({ users });
  };

  handleEditModalCancel = () => {
    this.setState({ isEditModalVisible: false, editingUser: null });
  };

  handleEditFormSubmit = (values: IEntity.User) => {
    const editedUsers = this.state.users.map(user => (user.id === values.id ? { ...user, ...values } : user));

    this.setState({ users: editedUsers, isEditModalVisible: false, editingUser: null });
  };

  render() {
    const { isLoading, users, isEditModalVisible, editingUser } = this.state;

    return (
      <div className="mx-auto w-[1400px]">
        {!!users.length && (
          <Table
            bordered
            rowKey="id"
            columns={[
              {
                title: '🆔',
                dataIndex: 'id',
                width: 40
              },
              {
                title: 'Name 🌀',
                dataIndex: 'name'
              },
              {
                title: 'Username 🤦🏻',
                dataIndex: 'username'
              },
              {
                title: 'Email 📧',
                dataIndex: 'email'
              },
              {
                title: 'City 🌆',
                dataIndex: 'city'
              },
              {
                title: 'ZipCode 🔒',
                dataIndex: 'zipcode',
                render: zipcode => <Tag>UZ {zipcode}</Tag>
              },
              {
                title: 'Website ⛬',
                dataIndex: 'website'
              },
              {
                title: 'Company 💼',
                dataIndex: 'company'
              },
              {
                title: 'Actions',
                dataIndex: '',
                render: (value, user) => (
                  <Button.Group>
                    <Button
                      className=" bg-green-600"
                      onClick={() => {
                        this.onInfo(user.id);
                        window.history.replaceState({}, '', `/${user.id}`);
                      }}
                    >
                      👁️
                    </Button>
                    <Button className=" bg-blue-800" onClick={() => this.onEdit(user.id)}>✍️</Button>
                    <Button className=" bg-red-700" onClick={() => this.onDelete(user.id)}>
                      🗑
                    </Button>
                  </Button.Group>
                )
              }
            ]}
            dataSource={users}
            pagination={false}
            rowClassName="text-center"
          />
        )}

        {/* Edit Modal */}
        <Modal visible={isEditModalVisible} title="Edit User" onCancel={this.handleEditModalCancel} footer={null}>
          {editingUser && (
            <Form initialValues={editingUser} onFinish={this.handleEditFormSubmit}>
              <Form.Item label="Name" name="name" rules={[{ required: true }]}>
                <Input />
              </Form.Item>
              <Form.Item label="Username" name="username" rules={[{ required: true }]}>
                <Input />
              </Form.Item>
              <Form.Item label="Email" name="email" rules={[{ required: true }]}>
                <Input />
              </Form.Item>
              <Form.Item label="City" name="city" rules={[{ required: true }]}>
                <Input />
              </Form.Item>
              <Form.Item label="Zipcode" name="zipcode" rules={[{ required: true }]}>
                <Input />
              </Form.Item>
              <Form.Item label="Website" name="website" rules={[{ required: true }]}>
                <Input />
              </Form.Item>
              <Form.Item label="Company" name="company" rules={[{ required: true }]}>
                <Input />
              </Form.Item>

              <Form.Item>
                <Button type="primary" htmlType="submit">
                  Save
                </Button>
              </Form.Item>
            </Form>
          )}
        </Modal>

        <Spinner visible={isLoading} />
      </div>
    );
  }
}
