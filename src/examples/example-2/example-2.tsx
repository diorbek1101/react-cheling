import { Component } from 'react';
import Counter from './components/counter';

interface Example2State {
  count: number;
}

export default class Example2 extends Component<any, Example2State> {
  state: Example2State = {
    count: this.props.initValue || 0
  };

  handleIncrement = () => this.setState(({ count }) => ({ count: count + 1 }));

  render() {
    return (
      <div className="container mx-auto pt-2">
        <Counter count={this.state.count} onIncrement={this.handleIncrement} />
      </div>
    );
  }
}
