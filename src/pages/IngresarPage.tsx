import React, { useRef } from 'react';
import { Form, Input, Button, InputNumber, Typography, Divider } from 'antd';
import {
  SearchOutlined,
} from '@ant-design/icons';
import { Redirect, useHistory } from 'react-router-dom';
import { Agente } from '../interfaces/Agente';
import { useHideMenu } from '../hooks/useHideMenu';
import { getUserStorage } from '../helper/getUserStorage';

const { Title, Text } = Typography;

export const IngresarPage = () => {

  useHideMenu( false );

  const history = useHistory();
  const usuario = useRef( getUserStorage() );

  const onFinish = ( { agente, escritorio }: Agente ) => {
    localStorage.setItem('agente', agente);
    localStorage.setItem('escritorio', escritorio);

    history.push('/escritorio');
  };

  const onFinishFailed = ( errorInfo: any ) => {
    console.log('Failed:', errorInfo);
  };

  if( usuario.current.agente && usuario.current.escritorio) {
    return <Redirect to='/escritorio' />;
  }

  return (
    <div>

      <Title level={ 2 }>
        Ingresar
      </Title>
      <Text>
        Ingrese su nombre y número de escritorio
      </Text>
      <Divider />

      <Form
        name="basic"
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 14 }}
        initialValues={{ remember: true }}
        onFinish={ onFinish }
        onFinishFailed={ onFinishFailed }
      >
        <Form.Item
          label="Nombre del agente"
          name="agente"
          rules={[{ required: true, message: 'Ingrese su nombre' }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="Escritorio"
          name="escritorio"
          rules={[{ required: true, message: 'Ingrese el número de escritorio' }]}
        >
          <InputNumber min={ 1 } max={ 99 } />
        </Form.Item>
        <Form.Item wrapperCol={{ offset: 8, span: 14 }}>
          <Button
            type="primary"
            htmlType="submit"
            shape='round'
          >
            <SearchOutlined />
            Ingresar
          </Button>
        </Form.Item>
      </Form>

    </div>
  )
}
