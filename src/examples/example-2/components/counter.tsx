import { FC } from 'react';
import { Button } from 'antd';

interface CounterProps {
  count: number;
  onIncrement(): void;
}

const Counter: FC<CounterProps> = ({ count, onIncrement }) => {
  return (
    <Button type={count % 2 ? 'default' : 'primary'} onClick={onIncrement}>
      Count: {count}
    </Button>
  );
};

export default Counter;
