import React from "react";

type Props = {
  name?: string;
  onChange?: any;
  onCreate?: any;
};
const AddUser: React.FC<Props> = ({ name, onChange, onCreate }) => {
  return (
    <div>
      <input name="name" placeholder="이름" onChange={onChange} value={name} />
      <button onClick={onCreate}>저장</button>
    </div>
  );
};

export default AddUser;
