import { View, Text, StyleSheet } from 'react-native';
import React from 'react';
import { VictoryLabel, VictoryPie } from 'victory-native';
import IProject from '../../hooks/query/useGetProjectByCurrentUser';
import ArrowPressable from './ArrowPressable';

export default function DashboardChart({
  arrayOfData,
  section,
}: {
  arrayOfData: IProject[] | undefined | null;
  section: string;
}) {
  const [show, setShow] = React.useState(true);
  const data = arrayOfData?.map((item: any) => {
    return {
      projectName: item?.title,
      NumberOfTickets: item.Tickets?.length,
    };
  });

  return (
    <View style={styles.container}>
      <View style={styles.containerDirection}>
        <Text style={styles.section}>{section}</Text>
        <ArrowPressable show={show} setShow={setShow} />
      </View>
      {show && (
        <VictoryPie
          data={data}
          x="projectName"
          y="NumberOfTickets"
          colorScale={['#f44336', '#e91e63', '#9c27b0']}
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
            <VictoryLabel textAnchor="middle" labelPlacement="parallel" />
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
