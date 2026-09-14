import { useEffect, useRef, useState } from 'react';
import clsx from 'clsx';

import { ArrowButton } from 'src/ui/arrow-button';
import { Button } from 'src/ui/button';

import styles from './ArticleParamsForm.module.scss';

export const ArticleParamsForm = () => {
	const [isOpen, setIsOpen] = useState(false);
	const formRef = useRef<HTMLElement>(null);

	const handleArrowClick = () => {
		setIsOpen((currentState) => !currentState);
	};

	useEffect(() => {
		if (!isOpen) {
			return;
		}

		const handleOutsideClick = (event: MouseEvent) => {
			const target = event.target as Node;

			if (!formRef.current?.contains(target)) {
				setIsOpen(false);
			}
		};

		document.addEventListener('click', handleOutsideClick);

		return () => {
			document.removeEventListener('click', handleOutsideClick);
		};
	}, [isOpen]);

	return (
		<>
			<ArrowButton isOpen={isOpen} onClick={handleArrowClick} />
			<aside
				ref={formRef}
				className={clsx(styles.container, {
					[styles.container_open]: isOpen,
				})}>
				<form className={styles.form}>
					<div className={styles.bottomContainer}>
						<Button title='Сбросить' htmlType='reset' type='clear' />
						<Button title='Применить' htmlType='submit' type='apply' />
					</div>
				</form>
			</aside>
		</>
	);
};
