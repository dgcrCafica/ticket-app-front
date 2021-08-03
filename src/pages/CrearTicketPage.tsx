import React, { useContext, useState } from 'react'
import { Button, Col, Row, Typography } from 'antd';
import { DownloadOutlined } from '@ant-design/icons';
import { useHideMenu } from '../hooks/useHideMenu';
import { SocketContext } from '../context/SocketContext';
import { Ticket } from '../interfaces/Ticket';

const { Title, Text } = Typography;

export const CrearTicketPage = () => {

  useHideMenu( true );

  const { socket } = useContext( SocketContext );
  const [ ticket, setTicket ] = useState<Ticket>();

  const nuevoTicket = () => {
    socket.emit('solicitar-ticket', null, ( data: Ticket ) => {
      setTicket( data );
    });
  }

  return (
    <>
      <Row justify='center'>
        <Col span={ 12 } style={{ textAlign: 'center' }}>
          <Title level={ 3 } >
            Presione el botón para un nuevo ticket
          </Title>

          <Button
            type='primary'
            shape='round'
            icon={ <DownloadOutlined /> }
            size='large'
            onClick={ () => nuevoTicket() }
            // block
          >
            Nuevo Ticket
          </Button>
        </Col>
      </Row>

      {
        ( ticket ) && (
          <Row style={{ marginTop: '8vh' }}>
            <Col span={ 12 } offset={ 6 } style={{ textAlign: 'center' }}>
              <h2>
                <Text>
                  Su número
                </Text>
              </h2>
              <Text
                type='success'
                style={{ fontSize: 55 }}
              >
                { ticket.numero }
              </Text>
            </Col>
          </Row>
        )
      }

    </>
  )
}
