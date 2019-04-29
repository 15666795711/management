import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { Layout, Menu, Icon } from 'antd';
import HeaderUI from '../../common/layout/header'; //引入公共布局组件
import FooterUI from '../../common/layout/footer'; //引入公共布局组件
import BreadCrumbUI from '../../common/layout/breadcrumb'; //引入公共布局组件
import { actionCreators } from './store'; //从store文件夹引入actionCreators模块

const { SubMenu } = Menu;
const { Content, Sider } = Layout;

class Manage extends PureComponent {
	componentDidMount() {}
	render() {
		return (
			<Layout>
				<HeaderUI />
				<Content style={{ padding: '0 50px' }}>
					<BreadCrumbUI />
					<Layout style={{ padding: '24px 0', background: '#fff' }}>
						<Sider width={200} style={{ background: '#fff' }}>
							<Menu
								mode="inline"
								defaultSelectedKeys={[ '1' ]}
								defaultOpenKeys={[ 'sub1' ]}
								style={{ height: '100%' }}
							>
								<SubMenu
									key="sub1"
									title={
										<span>
											<Icon type="user" />subnav 1
										</span>
									}
								>
									<Menu.Item key="1">option1</Menu.Item>
									<Menu.Item key="2">option2</Menu.Item>
									<Menu.Item key="3">option3</Menu.Item>
									<Menu.Item key="4">option4</Menu.Item>
								</SubMenu>
								<SubMenu
									key="sub2"
									title={
										<span>
											<Icon type="laptop" />subnav 2
										</span>
									}
								>
									<Menu.Item key="5">option5</Menu.Item>
									<Menu.Item key="6">option6</Menu.Item>
									<Menu.Item key="7">option7</Menu.Item>
									<Menu.Item key="8">option8</Menu.Item>
								</SubMenu>
								<SubMenu
									key="sub3"
									title={
										<span>
											<Icon type="notification" />subnav 3
										</span>
									}
								>
									<Menu.Item key="9">option9</Menu.Item>
									<Menu.Item key="10">option10</Menu.Item>
									<Menu.Item key="11">option11</Menu.Item>
									<Menu.Item key="12">option12</Menu.Item>
								</SubMenu>
							</Menu>
						</Sider>
						<Content style={{ padding: '0 24px', minHeight: 280 }} />
					</Layout>
				</Content>
				<FooterUI />
			</Layout>
		);
	}
}

const mapStateToProps = (state) => ({});

const mapDispatchToProps = (dispatch) => ({});

export default connect(mapStateToProps, mapDispatchToProps)(Manage);
