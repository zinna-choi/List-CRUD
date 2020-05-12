import React from "react";

type Props = {
  users?: any;
  onRemove?: any;
  onEditClick?: any;
  onEdit?: any;
  updateUsers?: any;
  setUpdateUsers?: any;
  onClick?: () => void;
};

const List: React.FC<Props> = ({
  onRemove,
  onEditClick,
  onEdit,
  updateUsers,
  setUpdateUsers,
  users,
}) => {
  return (
    <div>
      <ul>
        {users.map((user: any) => (
          <li key={user.id}>
            {(!updateUsers || updateUsers.id !== user.id) && (
              <>
                <p>{user.name}</p>
                <button onClick={() => onRemove(user.id)}>삭제</button>
                <button onClick={() => onEditClick(user.id)}>수정</button>
              </>
            )}

            {updateUsers && updateUsers.id === user.id && (
              <>
                <input
                  type="text"
                  value={updateUsers.name}
                  onChange={(e) =>
                    setUpdateUsers({ ...updateUsers, name: e.target.value })
                  }
                />
                <button onClick={() => setUpdateUsers(undefined)}>취소</button>
                <button onClick={() => onEdit()}>저장</button>
              </>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default List;
