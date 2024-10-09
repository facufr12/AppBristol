/* eslint-disable */
// import node module libraries
import { Fragment, useContext, useEffect, useState } from 'react';
import { Form, Image } from 'react-bootstrap';
import { Link } from 'react-router-dom';

// import context file
import { AppConfigContext } from 'context/Context';

// import media file
import LightModeIcon from 'assets/images/sun.svg';
import DarkModeIcon from 'assets/images/moon.svg';

const DarkLightMode = ({ className }) => {
	const ConfigContext = useContext(AppConfigContext);
	const [theme, setTheme] = useState(ConfigContext.appStats.skin || 'light');

	useEffect(() => {
		document.querySelector('html').setAttribute('data-theme', theme);
		ConfigContext.setAppConfig(theme);
	}, [theme, ConfigContext]);

	const changeColorMode = () => {
		setTheme(prevTheme => (prevTheme === 'light' ? 'dark' : 'light'));
	};

	return (
		<Fragment>
			<Link
				to="#"
				type="checkbox"
				id="flexSwitchCheckDefault"
				onClick={changeColorMode}
				className={`form-check form-switch theme-switch btn btn-light btn-icon rounded-circle ${className}`}
			>
				<Form.Check.Input
					type="checkbox"
					isValid
					value={theme}
					style={{ display: 'none' }}
				/>
				<Form.Check.Label style={{ cursor: 'pointer' }}>
					<Image src={theme === 'dark' ? DarkModeIcon : LightModeIcon} />
				</Form.Check.Label>
			</Link>
		</Fragment>
	);
};

export default DarkLightMode;
