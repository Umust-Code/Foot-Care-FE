import { css } from '@emotion/react';
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-balham.css';

const containerCss = css`
  width: 100%;
  height: 100%;

  .ag-header-cell-label {
    justify-content: center;
  }
`;

interface BasicGridProps {
  data: any;
  defaultColDef?: any;
  columnDefs: any;
  isLoading?: boolean;
  getRowStyle?: any;
  isError?: boolean;
  searchValue?: string;
  pagination: boolean;
  onGridReady?: (params: any) => void;
  autoGroupColumnDef?: any;
}

function BasicGrid(props: BasicGridProps) {
  if (props.isError) {
    return <div>Error 발생</div>;
  }
  return (
    <div css={containerCss} className="ag-theme-balham">
      <AgGridReact
        rowData={props.data}
        defaultColDef={props.defaultColDef}
        columnDefs={props.columnDefs}
        paginationPageSize={100}
        loading={props.isLoading}
        pagination={props.pagination}
        getRowStyle={props.getRowStyle}
        quickFilterText={props.searchValue}
        onGridReady={props.onGridReady}
        autoGroupColumnDef={props.autoGroupColumnDef}
        animateRows={true}
        groupDisplayType={'singleColumn'}
      />
    </div>
  );
}

export { BasicGrid };
