import { View, Text, StyleSheet } from 'react-native';
import React from 'react';
import { VictoryLabel, VictoryPie } from 'victory-native';
import ArrowPressable from '../dashboard/ArrowPressable';
import { chooseRandomColor } from '../dashboard/Dashboard';

type chartProps = {
  section: string;
  object: objectData;
};

type objectData = {
  nbrOfOpenTickets: number;
  nbrOfTicketsInProgress: number;
  nbrOfClosedTickets: number;
};

export default function ProjectChart({ section, object }: chartProps) {
  const [show, setShow] = React.useState(true);

  const objectData = [
    {
      x: object?.nbrOfOpenTickets + object?.nbrOfTicketsInProgress,
      y: object?.nbrOfOpenTickets + object?.nbrOfTicketsInProgress,
      label:
        object?.nbrOfOpenTickets + object?.nbrOfTicketsInProgress > 1
          ? object?.nbrOfOpenTickets +
            object?.nbrOfTicketsInProgress +
            ' active tickets'
          : object?.nbrOfOpenTickets +
            object?.nbrOfTicketsInProgress +
            ' active ticket',
    },
    {
      x: object?.nbrOfClosedTickets,
      y: object?.nbrOfClosedTickets,
      label:
        object?.nbrOfClosedTickets > 1
          ? object?.nbrOfClosedTickets + ' closed tickets'
          : object?.nbrOfClosedTickets + ' closed ticket',
    },
  ];

  return (
    <View style={styles.container}>
      <View style={styles.containerDirection}>
        <Text style={styles.section}>{section}</Text>
        <ArrowPressable show={show} setShow={setShow} />
      </View>
      {show && (
        <VictoryPie
          data={objectData}
          x="x"
          y="y"
          colorScale={[chooseRandomColor(), chooseRandomColor()]}
          width={450}
          height={300}
          style={{
            data: {
              fillOpacity: 0.9,
              stroke: '#fff',
            },
            labels: {
              fontSize: 10,
              fill: 'black',
            },
          }}
          labelComponent={
            <VictoryLabel
              textAnchor="middle"
              labelPlacement="parallel"
              angle={0}
            />
          }
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fbfbfb',
    marginTop: 10,
    marginVertical: 10,
    borderRadius: 5,
  },
  containerDirection: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
  section: {
    fontSize: 20,
    paddingBottom: 10,
    paddingLeft: 10,
    fontStyle: 'italic',
  },
});
