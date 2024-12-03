import { Fragment, useContext } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useMediaQuery } from 'react-responsive';
import {
	ListGroup,
	Accordion,
	Card,
	Image,
	Badge,
	useAccordionButton,
	AccordionContext
} from 'react-bootstrap';
import SimpleBar from 'simplebar-react';
import 'simplebar/dist/simplebar.min.css';
import InverseLogo from 'assets/images/logo-bristol.svg';
import { DashboardMenu } from 'routes/dashboard/DashboardRoutes';

const NavbarVertical = (props) => {
	const location = useLocation();
	const isMobile = useMediaQuery({ maxWidth: 767 });

	const CustomToggle = ({ children, eventKey, icon }) => {
		const { activeEventKey } = useContext(AccordionContext);
		const decoratedOnClick = useAccordionButton(eventKey, () =>
			console.log('Event Key : ' + eventKey)
		);
		const isCurrentEventKey = activeEventKey === eventKey;
		return (
			<li className="nav-item">
				<Link
					className="nav-link"
					onClick={decoratedOnClick}
					to="#!"
					data-bs-toggle="collapse"
					data-bs-target="#navDashboard"
					aria-expanded={isCurrentEventKey ? true : false}
					aria-controls="navDashboard"
				>
					{icon ? <i className={`nav-icon fe fe-${icon} me-2`}></i> : ''}{' '}
					{children}
				</Link>
			</li>
		);
	};

	const generateLink = (item) => {
		return (
			<Link
				className={`nav-link ${location.pathname === item.link ? 'active' : ''}`}
				to={item.link}
				onClick={(e) => (isMobile ? props.onClick(!props.showMenu) : props.showMenu)}
			>
				{item.name}
				{''}
				{item.badge ? (
					<Badge className="ms-1" bg={item.badgecolor ? item.badgecolor : 'primary'}>
						{item.badge}
					</Badge>
				) : (
					''
				)}
			</Link>
		);
	};

	return (
		<Fragment>
			<SimpleBar style={{ maxHeight: '100vh' }}>
				<div className="nav-scroller" style={{ marginLeft: isMobile ? '30px' : '0' }}>
					<Link className="navbar-brand" to="/user/instructor">
						<Image src={InverseLogo} alt="" />
					</Link>
				</div>
				{/* Dashboard Menu */}
				<Accordion defaultActiveKey="0" as="ul" className="navbar-nav flex-column">
					{DashboardMenu.map(function (menu, index) {
						if (menu.grouptitle) {
							return (
								<Card bsPrefix="nav-item" key={index}>
									<div className="navbar-heading">{menu.title}</div>
								</Card>
							);
						} else {
							if (menu.children) {
								return (
									<Fragment key={index}>
										<CustomToggle eventKey={menu.id} icon={menu.icon}>
											{menu.title}
											{menu.badge ? (
												<Badge className="ms-1" bg={menu.badgecolor ? menu.badgecolor : 'primary'}>
													{menu.badge}
												</Badge>
											) : (
												''
											)}
										</CustomToggle>
										<Accordion.Collapse eventKey={menu.id} as="li" bsPrefix="nav-item">
											<Accordion className="navbar-nav flex-column" as="ul">
												<ListGroup as="ul" bsPrefix="" className="nav flex-column">
													{menu.children.map(function (menuItem, menuItemIndex) {
														if (menuItem.children) {
															return (
																<Fragment key={menuItemIndex}>
																	<CustomToggle eventKey={menuItem.id}>
																		{menuItem.title}
																		{menuItem.badge ? (
																			<Badge className="ms-1" bg={menuItem.badgecolor ? menuItem.badgecolor : 'primary'}>
																				{menuItem.badge}
																			</Badge>
																		) : (
																			''
																		)}
																	</CustomToggle>
																	<Accordion.Collapse eventKey={menuItem.id} bsPrefix="nav-item" as="li">
																		<Accordion className="navbar-nav flex-column" as="ul">
																			<ListGroup as="ul" bsPrefix="" className="nav flex-column">
																				{menuItem.children.map(function (subMenuItem, subMenuItemIndex) {
																					return subMenuItem.children ? (
																						<Fragment key={subMenuItemIndex}>
																							<CustomToggle eventKey={subMenuItem.id}>
																								{subMenuItem.title}
																								{subMenuItem.badge ? (
																									<Badge className="ms-1" bg={subMenuItem.badgecolor ? subMenuItem.badgecolor : 'primary'}>
																										{subMenuItem.badge}
																									</Badge>
																								) : (
																									''
																								)}
																							</CustomToggle>
																							<Accordion.Collapse eventKey={subMenuItem.id} bsPrefix="nav-item" as="li">
																								<ListGroup as="ul" bsPrefix="" className="nav flex-column">
																									{subMenuItem.children.map(function (thirdLevelItem, thirdLevelItemIndex) {
																										return (
																											<ListGroup.Item key={thirdLevelItemIndex} as="li" bsPrefix="nav-item">
																												{generateLink(thirdLevelItem)}
																											</ListGroup.Item>
																										);
																									})}
																								</ListGroup>
																							</Accordion.Collapse>
																						</Fragment>
																					) : (
																						<ListGroup.Item key={subMenuItemIndex} as="li" bsPrefix="nav-item">
																							{generateLink(subMenuItem)}
																						</ListGroup.Item>
																					);
																				})}
																			</ListGroup>
																		</Accordion>
																	</Accordion.Collapse>
																</Fragment>
															);
														} else {
															return (
																<ListGroup.Item as="li" bsPrefix="nav-item" key={menuItemIndex}>
																	{generateLink(menuItem)}
																</ListGroup.Item>
															);
														}
													})}
												</ListGroup>
											</Accordion>
										</Accordion.Collapse>
									</Fragment>
								);
							} else {
								return (
									<Card bsPrefix="nav-item" key={index}>
										<Link to={menu.link} className={`nav-link ${location.pathname === menu.link ? 'active' : ''}`}>
											{typeof menu.icon === 'string' ? (
												<i className={`nav-icon fe fe-${menu.icon} me-2`}></i>
											) : (
												menu.icon
											)}
											{menu.title}
											{menu.badge ? (
												<Badge className="ms-1" bg={menu.badgecolor ? menu.badgecolor : 'primary'}>
													{menu.badge}
												</Badge>
											) : (
												''
											)}
										</Link>
									</Card>
								);
							}
						}
					})}
				</Accordion>
			</SimpleBar>
		</Fragment>
	);
};

export default NavbarVertical;
