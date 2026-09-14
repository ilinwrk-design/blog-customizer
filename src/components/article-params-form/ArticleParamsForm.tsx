import { useEffect, useRef, useState } from 'react';
import clsx from 'clsx';

import {
	ArticleStateType,
	backgroundColors,
	contentWidthArr,
	defaultArticleState,
	fontColors,
	fontFamilyOptions,
	fontSizeOptions,
} from 'src/constants/articleProps';
import { ArrowButton } from 'src/ui/arrow-button';
import { Button } from 'src/ui/button';
import { RadioGroup } from 'src/ui/radio-group';
import { Select } from 'src/ui/select';
import { Separator } from 'src/ui/separator';
import { Text } from 'src/ui/text';

import styles from './ArticleParamsForm.module.scss';

type ArticleParamsFormProps = {
	onApply: (settings: ArticleStateType) => void;
};

export const ArticleParamsForm = ({ onApply }: ArticleParamsFormProps) => {
	const [isOpen, setIsOpen] = useState(false);
	const [formState, setFormState] = useState(defaultArticleState);
	const formRef = useRef<HTMLDivElement>(null);

	const handleArrowClick = () => {
		setIsOpen((currentState) => !currentState);
	};
	const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		onApply(formState);
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

		document.addEventListener('mousedown', handleOutsideClick);

		return () => {
			document.removeEventListener('mousedown', handleOutsideClick);
		};
	}, [isOpen]);

	return (
		<div ref={formRef}>
			<ArrowButton isOpen={isOpen} onClick={handleArrowClick} />

			<aside
				className={clsx(styles.container, {
					[styles.container_open]: isOpen,
				})}>
				<form className={styles.form} onSubmit={handleSubmit}>
					<Text as='h2' size={31} weight={800} uppercase>
						Задайте параметры
					</Text>

					<Select
						title='шрифт'
						selected={formState.fontFamilyOption}
						options={fontFamilyOptions}
						onChange={(option) =>
							setFormState({
								...formState,
								fontFamilyOption: option,
							})
						}
					/>

					<RadioGroup
						name='font-size'
						title='размер шрифта'
						selected={formState.fontSizeOption}
						options={fontSizeOptions}
						onChange={(option) =>
							setFormState({
								...formState,
								fontSizeOption: option,
							})
						}
					/>

					<Select
						title='цвет шрифта'
						selected={formState.fontColor}
						options={fontColors}
						onChange={(option) =>
							setFormState({
								...formState,
								fontColor: option,
							})
						}
					/>

					<Separator />

					<Select
						title='цвет фона'
						selected={formState.backgroundColor}
						options={backgroundColors}
						onChange={(option) =>
							setFormState({
								...formState,
								backgroundColor: option,
							})
						}
					/>

					<RadioGroup
						name='content-width'
						title='ширина контента'
						selected={formState.contentWidth}
						options={contentWidthArr}
						onChange={(option) =>
							setFormState({
								...formState,
								contentWidth: option,
							})
						}
					/>

					<div className={styles.bottomContainer}>
						<Button title='Сбросить' htmlType='reset' type='clear' />
						<Button title='Применить' htmlType='submit' type='apply' />
					</div>
				</form>
			</aside>
		</div>
	);
};
