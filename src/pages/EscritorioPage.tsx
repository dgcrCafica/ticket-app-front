import React, { useContext, useRef, useState } from 'react';
import { Button, Col, Divider, Row, Typography } from 'antd';
import { CloseCircleOutlined, RightOutlined } from '@ant-design/icons';
import { Redirect, useHistory } from 'react-router-dom';
import { Agente } from '../interfaces/Agente';
import { useHideMenu } from '../hooks/useHideMenu';
import { SocketContext } from '../context/SocketContext';
import { getUserStorage } from '../helper/getUserStorage';
import { Ticket } from '../interfaces/Ticket';

const { Title, Text } = Typography;

export const EscritorioPage = () => {

  const { socket } = useContext( SocketContext )

  useHideMenu( false );

  const history = useHistory();
  const usuario = useRef<Agente>( getUserStorage() );
  const [ ticket, setTicket ] = useState<Ticket>();

  const salir = () => {
    localStorage.removeItem('agente');
    localStorage.removeItem('escritorio');
    history.replace('/ingresar');
  }

  const siguienteTicket = () => {
    socket.emit('siguiente-ticket-trabajar', usuario.current, ( data: Ticket ) => {
      setTicket( data );
    });
  }

  if( !usuario.current.agente || !usuario.current.escritorio) {
    return <Redirect to='/ingresar' />;
  }

  return (
    <div>
      <Row>
        <Col span={ 20 }>
          <Title level={ 2 }>{ usuario.current.agente }</Title>
          <Text>Usted está trabajando en el escritorio: </Text>
          <Text type='success'>{ usuario.current.escritorio }</Text>
        </Col>

        <Col span={ 4 } >
          <Row justify='end'>
            <Button
              type='primary'
              danger
              shape='round'
              onClick={ () => salir() }
            >
              <CloseCircleOutlined />
              Salir
            </Button>
          </Row>
        </Col>
      </Row>

      <Divider />

      {
        ( ticket ) && (
          <Row>
            <Col>
              <Text>Está atendiendo el ticket número: </Text>

              <Text
                style={{
                  fontSize: 30
                }}
                type='danger'
              >
                { ticket.numero }
              </Text>
            </Col>
          </Row>
        )
      }

      <Row>
        <Col offset={ 18 } span={ 6 } >
          <Row justify='end'>
            <Button
              onClick={ () => siguienteTicket() }
              shape='round'
              type='primary'
            >
              <RightOutlined />
              Siguiente
            </Button>
          </Row>
        </Col>
      </Row>

    </div>
  )
}
