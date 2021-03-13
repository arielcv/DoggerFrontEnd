import React, {useState} from 'react';
import CreateDogForm from "./createDogForm";
import {updateDog} from "../utils/services";

function DogCard({id, owner, name, size, deleteDog}) {
  const [editable, setEditable] = useState(false);
  const [data, setData] = useState({id,name, size});

  const handleEditDog = async (data) => {
    console.log(data);
    try {
      console.log(data);
      const response = await updateDog(data);
      const updatedName = response.data.name;
      const updatedSize = response.data.size;
      setData({name: updatedName, size: updatedSize});
      setEditable(false);
    } catch (e) {
      console.log("There was some errors");
    }
  };

  const dogInfo =
    <div className='card' style={{minWidth: '90%', margin: '1%'}}>
      <div className='card-header '>
        <div className='d-flex justify-content-between align-items-center'>
          <div>{data.name}</div>
          <div className='d-flex justify-content-between' style={{minWidth: '90px'}}>
            <button className='btn btn-outline-success'
                    onClick={() => setEditable(true)}
            >
              <i className='fa fa-edit'/>
            </button>
            <button className='btn btn-outline-danger'
                    onClick={() => deleteDog(data.id)}
            >
              <i className='fa fa-trash-o'/>
            </button>
          </div>
        </div>
      </div>
      <div className='card-body'>{data.size}</div>
    </div>;

  return (
    (editable) ? <CreateDogForm id={id}
                                owner={owner}
                                name={name}
                                size={size}
                                createForm={false}
                                editDog={handleEditDog}/> : dogInfo
  );
}

export default DogCard;
