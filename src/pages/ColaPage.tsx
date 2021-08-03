import React, { useContext, useEffect, useState } from 'react';
import { Card, Col, Divider, List, Row, Tag, Typography } from 'antd';
import { Ticket } from '../interfaces/Ticket';
import { useHideMenu } from '../hooks/useHideMenu';
import { SocketContext } from '../context/SocketContext';
import { getUltimos } from '../helper/getUltimos';

const { Title, Text } = Typography;

export const ColaPage = () => {

  useHideMenu( true );
  
  const { socket } = useContext( SocketContext );
  const [ tickets, setTickets ] = useState<Ticket[]>([]);

  useEffect(() => {
    socket.on('ticket-asignado', ( data: Ticket[] ) => {
      setTickets( data );
    });

    return () => {
      socket.off('ticket-asignado');
    }
  }, [ socket ]);

  useEffect(() => {
    getUltimos()
      .then( data => {
        setTickets( data );
      });
  }, [])

  const renderListItemCurrent = ( ticket: Ticket ) => {
    return (
      <List.Item>
        <Card
          style={{
            width: 300,
            marginTop: 16,
          }}
          actions={[
            <Tag color='volcano'> { ticket.agente } </Tag>,
            <Tag color='magenta'> Escritorio: { ticket.escritorio } </Tag>,
          ]}
        >
          <Title>
            No. { ticket.numero }
          </Title>
        </Card>
      </List.Item>
    );
  }

  const renderListItemHistory = ( ticket: Ticket ) => {
    return (
      <List.Item>
        <List.Item.Meta
          title={`Ticket No. ${ ticket.numero }`}
          description={
            <>
              <Text type='secondary'>En el escritorio: </Text>
              <Tag color='magenta'> { ticket.numero } </Tag>
              <Text type='secondary'>Agente: </Text>
              <Tag color='volcano'> { ticket.agente } </Tag>
            </>
          }
        >

        </List.Item.Meta>
      </List.Item>
    );
  }

  return (
    <>
      <Title level={ 1 }>
        Atendiendo al cliente
      </Title>

      <Row>
        <Col span={ 12 }>
          <List
            dataSource={ tickets.slice(0, 3) }
            renderItem={ ( item ) => renderListItemCurrent( item ) }
          />
        </Col>

        <Col span={ 12 }>
          <Divider> Historial </Divider>
          <List 
            dataSource={ tickets.slice( 3 ) }
            renderItem={ ( item ) => renderListItemHistory( item ) }
          />
        </Col>
      </Row>

    </>
  )
}
