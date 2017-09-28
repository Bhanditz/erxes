import React from 'react';
import PropTypes from 'prop-types';
import { compose, gql, graphql } from 'react-apollo';
import { Loading } from '/imports/react-ui/common';
import { VolumeReport } from '../components';
import { queries } from '../graphql';

const VolumeReportContainer = props => {
  const { volumePieChartQuery, brandsQuery, punchCardQuery, mainQuery } = props;

  if (
    volumePieChartQuery.loading ||
    brandsQuery.loading ||
    punchCardQuery.loading ||
    mainQuery.loading
  ) {
    return <Loading title="Volume Report" />;
  }

  const data = mainQuery.insightsMain;
  const updatedProps = {
    insights: volumePieChartQuery.insights,
    trend: data.trend,
    brands: brandsQuery.brands,
    punch: punchCardQuery.insightsPunchCard || [],
    summary: data.summary,
  };

  return <VolumeReport {...updatedProps} />;
};

VolumeReportContainer.propTypes = {
  queryParams: PropTypes.object,
  volumePieChartQuery: PropTypes.object,
  brandsQuery: PropTypes.object,
  punchCardQuery: PropTypes.object,
  mainQuery: PropTypes.object,
};

export default compose(
  graphql(gql(queries.pieChart), {
    name: 'volumePieChartQuery',
    options: ({ queryParams }) => ({
      fetchPolicy: 'network-only',
      variables: {
        brandId: queryParams.brandId,
        endDate: queryParams.endDate,
        startDate: queryParams.startDate,
      },
    }),
  }),
  graphql(gql(queries.punchCard), {
    name: 'punchCardQuery',
    options: ({ queryParams }) => ({
      fetchPolicy: 'network-only',
      variables: {
        type: 'volume',
        brandId: queryParams.brandId,
        integrationType: queryParams.integrationType,
        endDate: queryParams.endDate,
      },
    }),
  }),
  graphql(gql(queries.main), {
    name: 'mainQuery',
    options: ({ queryParams }) => ({
      fetchPolicy: 'network-only',
      variables: {
        type: 'volume',
        brandId: queryParams.brandId,
        integrationType: queryParams.integrationType,
        startDate: queryParams.startDate,
        endDate: queryParams.endDate,
      },
    }),
  }),
  graphql(gql(queries.brands), { name: 'brandsQuery' }),
)(VolumeReportContainer);