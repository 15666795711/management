import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { Table } from 'antd';
import { actionCreators } from '../store'; //从store文件夹引入actionCreators模块


class TableUI extends PureComponent {

	render() {
		const { columns, dataSource, changeSelectedRowKeys, changeSelectedRows } = this.props;
		const columnsJS = columns.toJS();
		const dataSourceJS = dataSource.toJS();

		const rowSelection = {
			onChange: (selectedRowKeys, selectedRows) => {
				console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
				changeSelectedRowKeys(selectedRowKeys);
				changeSelectedRows(selectedRows);
			}
		};

		return (
				<Table rowSelection={rowSelection} columns={columnsJS} dataSource={dataSourceJS} />
		);
	}
}

const mapDispatchToProps = (dispatch) => ({
	changeSelectedRowKeys(rowKeys) {
		dispatch(actionCreators.changeSelectedRowKeys(rowKeys));
	},
	changeSelectedRows(rows) {
		dispatch(actionCreators.changeSelectedRows(rows));
	}
});

export default connect(null, mapDispatchToProps)(TableUI);
