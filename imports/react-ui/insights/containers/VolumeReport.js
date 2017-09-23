import React, { PropTypes } from 'react';
import { compose, gql, graphql } from 'react-apollo';
import { Loading } from '/imports/react-ui/common';
import { VolumeReport } from '../components';

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
    punch: punchCardQuery.insightsPunchCard,
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
  graphql(
    gql`
      query insights($brandId: String, $startDate: String, $endDate: String) {
        insights(brandId: $brandId, startDate: $startDate, endDate: $endDate) {
          name
          value
        }
      }
    `,
    {
      name: 'volumePieChartQuery',
      options: ({ queryParams }) => ({
        fetchPolicy: 'network-only',
        variables: {
          brandId: queryParams.brandId,
          endDate: queryParams.endDate,
          startDate: queryParams.startDate,
        },
      }),
    },
  ),
  graphql(
    gql`
      query insightsPunchCard($type: String, $integrationType: String,
        $brandId: String, $endDate: String) {
        insightsPunchCard(type: $type, integrationType: $integrationType,
          brandId: $brandId, endDate: $endDate) {
          day
          value
        }
      }
    `,
    {
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
    },
  ),
  graphql(
    gql`
      query insightsMain($type: String, $integrationType: String,
        $brandId: String, $startDate: String, $endDate: String) {
        insightsMain(type: $type, integrationType: $integrationType,
          brandId: $brandId, startDate: $startDate, endDate: $endDate)
      }
    `,
    {
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
    },
  ),
  graphql(
    gql`
    query brands {
      brands {
        _id
        name
      }
    }`,
    { name: 'brandsQuery' },
  ),
)(VolumeReportContainer);