const companyFields = `
  _id
  name
  size
  industry
  website
  plan
  customFieldsData
`;

export const companies = `
  query companies($params: CompanyListParams) {
    companies(params: $params) {
      ${companyFields}
    }
  }
`;

export const companyCounts = `
  query companyCounts($params: CompanyListParams) {
    companyCounts(params: $params)
  }
`;

export const companyDetail = `
  query companyDetail($_id: String!) {
    companyDetail(_id: $_id) {
      ${companyFields}
    }
  }
`;

const segmentFields = `
  _id
  name
  description
  subOf
  color
  connector
  conditions
`;

export const segments = `
  query segments {
    segments {
      ${segmentFields}

      getSubSegments {
        ${segmentFields}
      }
    }
  }
`;

export const totalCompaniesCount = `
  query totalCompaniesCount {
    companiesTotalCount
  }
`;

export const fields = `
  query {
    fields(contentType: "company") {
      _id
      text
    }
  }
`;

export const companiesListConfig = `
  query {
    fieldsDefaultColumnsConfig(contentType: "company") {
      name
      label
      order
    }
  }
`;
