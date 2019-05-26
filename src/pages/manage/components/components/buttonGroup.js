import React, { PureComponent, Fragment } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { Button, Modal, notification } from 'antd';
import { BtnGroupWrapper } from '../../style';
import { actionCreators } from '../../store';

class ButtonGroup extends PureComponent {
	componentDidMount() {
		const { RouterPath, changeAddBtnName, showBtnGroup } = this.props;
		changeAddBtnName(RouterPath);
	}

	openNotificationWithIcon = (type) => {
		if (type === 'error') {
			notification[type]({
				message: '报错提示',
				description: '抱歉，数据丢失，请重试...'
			});
		} else {
			notification[type]({
				message: '成功提示',
				description: '操作成功！'
			});
		}
	};

	//查看组员or编辑试卷--通过判断是否选中一条数据来做不同的操作
	checkMembers(type, rows) {
		if (rows.size === 1) {
			const { deleteClick } = this.props;
			const rowsJS = rows.toJS();
			console.log('rowsJS:', rowsJS);
			// 路由跳转
			if (type === 'editExam') {
				window.sessionStorage.setItem('examName', rowsJS[0].examName);
				this.props.history.push({
					pathname: `/layout/manage/examManage/editExam`
				});
			} else if (type === 'checkMembers') {
				window.sessionStorage.setItem('name', rowsJS[0].name);
				this.props.history.push({
					pathname: `/layout/manage/userManage/selfManage`
				});
			} else if (type === 'deleteGroup') {
				deleteClick(rowsJS[0].usergroup, (data) => {});
			} else if(type === 'linkToQueBind'){
				window.sessionStorage.setItem('examName', rowsJS[0].name);
				this.props.history.push({
					pathname: `/layout/manage/questionManage/quesBind`
				});
			}
		} else {
			Modal.warning({
				title: '警告',
				content: '请选择一条数据！'
			});
		}
	}

	//批量操作
	batchOperate(type, rows) {
		const { deleteSelfClick, getTableInfo, RouterPath, deleteExam } = this.props;
		if (rows.size >= 1) {
			const rowsJS = rows.toJS();
			console.log('rowsJS:', rowsJS);
			if (type === 'deleteSelf') {
				let ids = [];
				for (let i = 0; i < rowsJS.length; i++) {
					ids.push(rowsJS[i].id);
				}
				// console.log('ids:',ids)
				deleteSelfClick(ids, (data) => {
					// console.log('deleteSelf:',data)
					if (data.status === 'success') {
						this.openNotificationWithIcon('success');
						getTableInfo(RouterPath);
					} else {
						this.openNotificationWithIcon('error');
					}
				});
			} else if (type === 'linkToExamBindInfo') {
				window.sessionStorage.setItem('userid', rowsJS[0].name);
				this.props.history.push({
					pathname: `/layout/manage/userManage/examBindInfo`
				});
			} else if (type === 'linkToExamBind') {
				// 向选择的用户添加试卷
				// window.sessionStorage.setItem('', rowsJS[0].name);
				this.props.history.push({
					pathname: `/layout/manage/userManage/examBind`
				});
			} else if (type === 'examBindInfo') {
				this.openNotificationWithIcon('success');
			} else if(type === 'examBind'){
				//把选择的试卷添加给选择的用户
			}else if (type === 'deleteExam') {
				deleteExam(rowsJS, (data) => {
					if (data.status === 'success') {
						this.openNotificationWithIcon('success');
						getTableInfo(RouterPath);
					} else {
						this.openNotificationWithIcon('error');
					}
				});
			} else if(type === 'quesBind'){
				//把题目添加给选择的试卷
			}
		} else {
			Modal.warning({
				title: '警告',
				content: '请至少选择一条数据！'
			});
		}
	}

	render() {
		console.log('btnGroup:', this);
		const { SelectedRows, showAddHandleClick, AddBtnName, RouterPath, history } = this.props;
		return (
			<BtnGroupWrapper>
				{/* userManage路由下 */}
				{RouterPath.includes('userManage') &&
				!RouterPath.includes('selfManage') &&
				!RouterPath.includes('examBindInfo') ? (
					<Fragment>
						<Button type="primary" className="btn" onClick={() => showAddHandleClick()}>
							{AddBtnName}
						</Button>
						<Button
							type="primary"
							className="btn"
							onClick={() => this.checkMembers('checkMembers', SelectedRows)}
						>
							查看组员
						</Button>
						<Button
							type="primary"
							className="btn"
							onClick={() => this.batchOperate('linkToExamBindInfo', SelectedRows)}
						>
							绑定试卷
						</Button>
						<Button
							type="danger"
							className="btn"
							onClick={() => this.checkMembers('deleteGroup', SelectedRows)}
						>
							删除
						</Button>
					</Fragment>
				) : (
					''
				)}
				{/* selfManage路由下 */}
				{RouterPath.includes('selfManage') ? (
					<Fragment>
						<Button type="primary" className="btn" onClick={() => showAddHandleClick()}>
							{AddBtnName}
						</Button>
						{/* <Button type="primary" className="btn">
							编辑
						</Button> */}
						{/* <Button
							type="primary"
							className="btn"
							onClick={() => this.batchOperate('linkToExamBind', SelectedRows)}
						>
							统计信息
						</Button> */}
						<Button
							type="primary"
							className="btn"
							onClick={() => this.batchOperate('linkToExamBindInfo', SelectedRows)}
						>
							绑定试卷
						</Button>
						<Button
							type="danger"
							className="btn"
							onClick={() => this.batchOperate('deleteSelf', SelectedRows)}
						>
							删除
						</Button>
					</Fragment>
				) : (
					''
				)}
				{/* examBindInfo路由下 */}
				{RouterPath.includes('examBindInfo') ? (
					<Fragment>
						<Button type="primary" className="btn" onClick={() => this.checkMembers('linkToExamBind',SelectedRows)}>
							{AddBtnName}
						</Button>
						<Button
							type="danger"
							className="btn"
							onClick={() => this.batchOperate('deleteExam', SelectedRows)}
						>
							删除
						</Button>
					</Fragment>
				) : (
					''
				)}
				{/* examBind路由下 */}
				{RouterPath.includes('examBind') ? (
					<Fragment>
						<Button type="primary" className="btn" onClick={() => this.batchOperate('examBind', SelectedRows)}>
							{AddBtnName}
						</Button>
					</Fragment>
				) : (
					''
				)}
				{/* examManage路由下 */}
				{RouterPath.includes('examManage') && !RouterPath.includes('editExam') ? (
					<Fragment>
						<Button type="primary" className="btn" onClick={() => showAddHandleClick()}>
							{AddBtnName}
						</Button>
						<Button
							type="primary"
							className="btn"
							onClick={() => this.checkMembers('editExam', SelectedRows)}
						>
							编辑试卷
						</Button>
						<Button type="danger" className="btn" onClick={() => this.batchOperate('delete', SelectedRows)}>
							删除
						</Button>
					</Fragment>
				) : (
					''
				)}
				{/* questionManage路由下 */}
				{RouterPath.includes('questionManage') && !RouterPath.includes('quesBind') ? (
					<Fragment>
						{/* <Button type="primary" className="btn" onClick={() => showAddHandleClick()}>
							{AddBtnName}
						</Button> */}
						{/* <Button type="primary" className="btn">
							编辑
						</Button> */}
						<Button type="danger" className="btn" onClick={() => this.batchOperate('delete', SelectedRows)}>
							删除
						</Button>
					</Fragment>
				) : (
					''
				)}
				{/* editExam路由 */}
				{RouterPath.includes('editExam') ? (
					<Fragment>
						<Button type="primary" className="btn" onClick={() => this.checkMembers('linkToQueBind',SelectedRows)}>
							{AddBtnName}
						</Button>
						<Button type="danger" className="btn" onClick={() => this.batchOperate('delete', SelectedRows)}>
							删除
						</Button>
					</Fragment>
				) : (
					''
				)}
				{/* quesBind路由 */}
				{RouterPath.includes('quesBind') ? (
					<Fragment>
						<Button type="primary" className="btn" onClick={() => this.batchOperate('quesBind', SelectedRows)}>
							{AddBtnName}
						</Button>
					</Fragment>
				) : (
					''
				)}
			</BtnGroupWrapper>
		);
	}
}

const mapStateToProps = (state) => ({
	SelectedRowKeys: state.getIn([ 'manage', 'selectedRowKeys' ]),
	SelectedRows: state.getIn([ 'manage', 'selectedRows' ]),
	RouterPath: state.getIn([ 'common', 'routerPath' ]),
	AddBtnName: state.getIn([ 'manage', 'addBtnName' ])
});

const mapDispatchToProps = (dispatch) => ({
	showAddHandleClick() {
		dispatch(actionCreators.showAddHandleClick());
	},
	changeAddBtnName(RouterPath) {
		dispatch(actionCreators.changeAddBtnName(RouterPath));
	},
	deleteClick(usergroup, callback) {
		dispatch(actionCreators.deleteClick(usergroup, callback));
	},
	deleteSelfClick(ids, callback) {
		dispatch(actionCreators.deleteSelfClick(ids, callback));
	},
	getTableInfo(data) {
		dispatch(actionCreators.getTableInfo(data));
	},
	deleteExam(ids, callback) {
		dispatch(actionCreators.deleteExam(ids, callback));
	}
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(ButtonGroup));
