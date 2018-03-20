import React from 'react';
import { Input } from 'reactstrap';

export default ({ input, label, type, meta: { error, touched } }) => {
  return (
    <div>
      <label style={{ marginLeft: '22px', fontSize: 'large' }}>{label}</label>
      <hr style={{ width: '94%', marginTop: '5px' }} />
      <Input
        {...input}
        type={type}
        placeholder={'Please enter your ' + type}
        style={{
          width: '94%',
          marginLeft: '24px',
          background: 'linear-gradient(#f9efaf, #f7e98d)'
        }}
      />
      <div
        style={{
          marginLeft: '30px',
          marginTop: '5px',
          marginBottom: '20px',
          color: 'red'
        }}
      >
        {touched && error}
      </div>
    </div>
  );
};
