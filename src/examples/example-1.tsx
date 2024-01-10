import { Button } from 'antd';
import { Component } from 'react';

interface Example1State {
  count: number;
}

export default class Example1 extends Component<any, Example1State> {
  state: Example1State = {
    count: this.props.initValue || 0
  };

  handleIncrement = () => {
    this.setState(({ count }) => ({ count: count + 1 }));
    console.log(this.state);
  };

  render() {
    return (
      <div className="container mx-auto pt-2">
        <Button onClick={this.handleIncrement}>Count: {this.state.count}</Button>
      </div>
    );
  }
}
