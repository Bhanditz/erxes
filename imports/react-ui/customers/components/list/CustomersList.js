import React from 'react';
import PropTypes from 'prop-types';
import { Table } from 'react-bootstrap';
import { Wrapper } from '/imports/react-ui/layout/components';
import { Pagination } from '/imports/react-ui/common';
import { Widget } from '/imports/react-ui/engage/containers';
import Sidebar from './sidebar/Sidebar';
import CustomerRow from './CustomerRow';

const propTypes = {
  customers: PropTypes.array.isRequired,
  counts: PropTypes.object.isRequired,
  columnsConfig: PropTypes.array.isRequired,
  segments: PropTypes.array.isRequired,
  brands: PropTypes.array.isRequired,
  integrations: PropTypes.array.isRequired,
  tags: PropTypes.array.isRequired,
  loadMore: PropTypes.func.isRequired,
  hasMore: PropTypes.bool.isRequired,
  bulk: PropTypes.array.isRequired,
  toggleBulk: PropTypes.func.isRequired,
};

function CustomersList({
  customers,
  counts,
  columnsConfig,
  segments,
  brands,
  integrations,
  tags,
  loadMore,
  hasMore,
  bulk,
  toggleBulk,
}) {
  const content = (
    <Pagination hasMore={hasMore} loadMore={loadMore}>
      <Table className="no-wrap">
        <thead>
          <tr>
            <th />
            <th>
              <a href="/customers/manage-columns">...</a>
            </th>
            {columnsConfig.map(({ name, label }) => <th key={name}>{label}</th>)}
          </tr>
        </thead>
        <tbody>
          {customers.map(customer => (
            <CustomerRow
              customer={customer}
              columnsConfig={columnsConfig}
              key={customer._id}
              toggleBulk={toggleBulk}
            />
          ))}
        </tbody>
      </Table>
    </Pagination>
  );

  const actionBar = <Wrapper.ActionBar left={<Widget customers={bulk} />} />;
  const breadcrumb = [{ title: `Customers (${counts.all})` }];

  return (
    <div>
      <Wrapper
        header={<Wrapper.Header breadcrumb={breadcrumb} />}
        actionBar={bulk.length > 0 ? actionBar : false}
        leftSidebar={
          <Sidebar
            counts={counts}
            segments={segments}
            brands={brands}
            integrations={integrations}
            tags={tags}
          />
        }
        content={content}
      />
    </div>
  );
}

CustomersList.propTypes = propTypes;

export default CustomersList;
