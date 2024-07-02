'use client';

import axios, { AxiosError } from 'axios';
import { Trash2 } from 'lucide-react';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import Select, {
	type ClassNamesConfig,
	type GroupBase,
	type MultiValue,
	type SingleValue,
} from 'react-select';
import Legend from '../FormStructure/Legend';
import { toast } from '../ui/use-toast';
import SearchResultsLoading from './SearchResultsLoading';
import SearchResultsTable from './SearchResultsTable';

type TImageExtensions =
	| '.jpeg'
	| '.jpg'
	| '.png'
	| '.gif'
	| '.svg'
	| '.webp'
	| '.avif';

type TPost = {
	id: string;
	title: string;
	cover_image:
		| `https://${string}${TImageExtensions}`
		| `http://${string}${TImageExtensions}`
		| `/ext-files/${string}${TImageExtensions}`;
	tags: string[];
	created_at: string;
};

type TTag = {
	name: string;
	posts: number;
};

export default function SearchResults() {
	const router = useRouter();
	const pathname = usePathname();
	const searchParams = useSearchParams();

	const searchTitleParam = searchParams.get('title');
	const searchTagParam = searchParams.get('tags');
	const searchStartDateParam = searchParams.get('start_date');
	const searchEndDateParam = searchParams.get('end_date');
	const limitParam = searchParams.get('limit');
	const offsetParam = searchParams.get('offset');
	const orderParam = searchParams.get('order');
	const orderByFieldParam = searchParams.get('order_field');

	const updateSearchResultsRoute = ({
		title,
		tags,
		start_date,
		end_date,
		update_limit,
		update_offset,
		update_order,
		order_field,
	}: {
		title?: string;
		tags?: string;
		start_date?: string;
		end_date?: string;
		update_limit?: string;
		update_offset?: string;
		update_order?: string;
		order_field?: string;
	} = {}) => {
		const params = new URLSearchParams(searchParams);
		title
			? params.set('title', title)
			: inputTitle
				? params.set('title', inputTitle)
				: params.delete('title');
		tags != '' && tags != undefined
			? params.set('tags', tags)
			: inputTags != undefined && inputTags.length > 0
				? params.set('tags', inputTags.map((tag) => tag.value).join(','))
				: params.delete('tags');
		start_date
			? params.set('start_date', start_date)
			: inputStartDate
				? params.set('start_date', inputStartDate)
				: params.delete('start_date');
		end_date
			? params.set('end_date', end_date)
			: inputEndDate
				? params.set('end_date', inputEndDate)
				: params.delete('end_date');
		update_limit
			? params.set('limit', update_limit)
			: limit
				? params.set('limit', limit.toString())
				: params.delete('limit');
		update_offset
			? params.set('offset', update_offset)
			: offset
				? params.set('offset', offset.toString())
				: params.delete('offset');
		update_order
			? params.set('order', update_order)
			: order
				? params.set('order', order)
				: params.delete('order');
		order_field
			? params.set('order_field', order_field)
			: orderByField
				? params.set('order_field', orderByField)
				: params.delete('order_field');

		router.push(`${pathname}?${params.toString()}`, { scroll: false });
	};

	const [searchTitle, setSearchTitle] = useState<string>(
		searchTitleParam ?? '',
	);
	const [searchTags, setSearchTags] = useState<string>(searchTagParam ?? '');
	const [searchStartDate, setSearchStartDate] = useState<string>(
		searchStartDateParam ?? '',
	);
	const [searchEndDate, setSearchEndDate] = useState<string>(
		searchEndDateParam ?? '',
	);
	const [limit, setLimit] = useState<number>(
		limitParam ? Number.parseInt(limitParam) : 15,
	);
	const [offset, setOffset] = useState<number>(
		offsetParam ? Number.parseInt(offsetParam) : 0,
	);
	const [orderByField, setOrderByField] = useState<string>(
		orderByFieldParam ?? 'created_at',
	);
	const [order, setOrder] = useState<string>(orderParam ?? 'desc');
	const [failedSearch, setFailedSearch] = useState<boolean>(false);

	const [posts, setPosts] = useState<TPost[]>([]);
	const [tags, setTags] = useState<{ value: string; label: string }[]>([]);
	const [maxOffset, setMaxOffset] = useState<number>(0);

	const fetchTags = useCallback(async () => {
		try {
			const response = await axios.get('/api/blog/tags');
			if (response) {
				const sortedTags = response.data.tags.sort(
					(a: TTag, b: TTag) => b.posts - a.posts,
				);
				const formattedTags: { value: string; label: string }[] =
					sortedTags.map((tag: TTag) => ({
						value: tag.name,
						label: `${tag.name} (${tag.posts})`,
					}));
				setTags(formattedTags);
				if (searchTagParam) {
					setInputTags(
						formattedTags.filter((tag) =>
							searchTagParam.split(',').includes(tag.value),
						),
					);
				}
			}
		} catch (error) {
			console.error(error);
		}
	}, [searchTagParam]);

	const fetchPosts = useCallback(async () => {
		try {
			const response = await axios.get('/api/blog', {
				params: {
					title: searchTitle,
					tags: searchTags,
					start_date: searchStartDate,
					end_date: searchEndDate,
					limit: limit,
					offset: offset,
					order: order,
					order_field: orderByField,
				},
			});
			if (response) {
				setPosts(response.data.posts);
				setMaxOffset(response.data.max_offset - 1);
				setFailedSearch(false);
				if (window.innerWidth > 640) {
					const searchCriteriaElement =
						document.getElementById('criterios-de-busca');
					searchCriteriaElement?.scrollIntoView({ behavior: 'smooth' });
				}
			}
		} catch (error) {
			if (error instanceof AxiosError) {
				// console.log(error.response);
				toast({
					title: 'Erro',
					variant: 'destructive',
					description:
						error.response?.data.message || error.response?.status == 404
							? error.response?.data.message
							: 'Erro desconhecido ao buscar posts. Tente novamente',
				});
				setPosts([]);
				setFailedSearch(true);
			} else {
				toast({
					title: 'Erro',
					variant: 'destructive',
					description: 'Erro desconhecido. Tente novamente.',
				});
			}
		}
	}, [
		searchTitle,
		searchTags,
		searchStartDate,
		searchEndDate,
		limit,
		offset,
		order,
		orderByField,
	]);

	useEffect(() => {
		fetchTags();
	}, [fetchTags]);

	useEffect(() => {
		fetchPosts();
		console.log('posts fetched');
	}, [fetchPosts]);

	const [inputTitle, setInputTitle] = useState(searchTitleParam ?? '');
	//inputTags recebe um tratamento diferente diretamente dentro da função
	//fetchTags() pois o valor pra setar no componente meio que depende da
	//resposta da chamada, já que vem tudo de outro serviço
	const [inputTags, setInputTags] =
		useState<MultiValue<{ value: string; label: string }>>();
	const [inputStartDate, setInputStartDate] = useState(
		searchStartDateParam ?? '',
	);
	const [inputEndDate, setInputEndDate] = useState(searchEndDateParam ?? '');
	const inputLimitOptions = useMemo(
		() => [
			{ value: '15', label: '15' },
			{ value: '25', label: '25' },
			{ value: '50', label: '50' },
			{ value: '100', label: '100' },
		],
		[],
	);
	const [inputLimit, setInputLimit] = useState(
		limitParam
			? { value: limitParam, label: limitParam }
			: { value: '15', label: '15' },
	);
	const inputOrderOptions = useMemo(
		() => [
			{ value: 'asc', label: 'Crescente' },
			{ value: 'desc', label: 'Decrescente' },
		],
		[],
	);
	const [inputOrder, setInputOrder] = useState(
		orderParam
			? {
					value: orderParam,
					label: orderParam === 'asc' ? 'Crescente' : 'Decrescente',
				}
			: { value: 'desc', label: 'Decrescente' },
	);
	const inputOrderByFieldOptions = useMemo(
		() => [
			{ value: 'created_at', label: 'Data de publicação' },
			{ value: 'title', label: 'Título' },
		],
		[],
	);
	const [inputOrderByField, setInputOrderByField] = useState(
		orderByFieldParam
			? {
					value: orderByFieldParam,
					label:
						orderByFieldParam === 'created_at'
							? 'Data de publicação'
							: 'Título',
				}
			: { value: 'created_at', label: 'Data de publicação' },
	);

	useEffect(() => {
		const url = `${pathname}?${searchParams.toString()}`;
		console.log(url);
		if (searchTitleParam) {
			setInputTitle(searchTitleParam);
			setSearchTitle(searchTitleParam);
		} else {
			setInputTitle('');
			setSearchTitle('');
		}
		if (searchTagParam) {
			console.log(searchTagParam);
			searchTagParam != ''
				? setInputTags(
						tags.filter((tag) => searchTagParam.split(',').includes(tag.value)),
					)
				: setInputTags([]);
			setSearchTags(searchTagParam);
		} else {
			setInputTags([]);
			setSearchTags('');
		}
		if (searchStartDateParam) {
			setInputStartDate(searchStartDateParam);
			setSearchStartDate(searchStartDateParam);
		} else {
			setInputStartDate('');
			setSearchStartDate('');
		}
		if (searchEndDateParam) {
			setInputEndDate(searchEndDateParam);
			setSearchEndDate(searchEndDateParam);
		} else {
			setInputEndDate('');
			setSearchEndDate('');
		}
		if (limitParam) {
			setInputLimit(
				inputLimitOptions.find((option) => option.value === limitParam) ?? {
					value: '15',
					label: '15',
				},
			);
			setLimit(Number.parseInt(limitParam));
		} else {
			setInputLimit({ value: '15', label: '15' });
			setLimit(15);
		}
		if (offsetParam) {
			setOffset(Number.parseInt(offsetParam));
		} else {
			setOffset(0);
		}
		if (orderParam) {
			setInputOrder(
				inputOrderOptions.find((option) => option.value === orderParam) ?? {
					value: 'desc',
					label: 'Decrescente',
				},
			);
			setOrder(orderParam);
		} else {
			setOrder('desc');
		}
		if (orderByFieldParam) {
			setInputOrderByField(
				inputOrderByFieldOptions.find(
					(option) => option.value === orderByFieldParam,
				) ?? {
					value: 'created_at',
					label: 'Data de publicação',
				},
			);
			setOrderByField(orderByFieldParam);
		} else {
			setOrderByField('created_at');
		}
	}, [
		inputLimitOptions,
		inputOrderByFieldOptions,
		inputOrderOptions,
		limitParam,
		offsetParam,
		orderByFieldParam,
		orderParam,
		pathname,
		searchEndDateParam,
		searchParams,
		searchStartDateParam,
		searchTagParam,
		searchTitleParam,
		tags,
	]);

	const submitSearch = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		setSearchTitle(inputTitle);
		setSearchTags(
			inputTags != undefined ? inputTags.map((tag) => tag.value).join(',') : '',
		);
		setSearchStartDate(inputStartDate);
		setSearchEndDate(inputEndDate);
		setOffset(0);
		updateSearchResultsRoute({
			title: inputTitle,
			tags:
				inputTags != undefined
					? inputTags.map((tag) => tag.value).join(',')
					: '',
			start_date: inputStartDate,
			end_date: inputEndDate,
			update_offset: '0',
		});
	};

	const handleLimitChange = (
		e: SingleValue<{ value: string; label: string }>,
	) => {
		if (e) {
			setLimit(Number.parseInt(e.value));
			setInputLimit(e);
			setOffset(0);
			updateSearchResultsRoute({ update_limit: e.value });
		}
	};

	const handleOffsetChange = (value: number) => {
		setOffset(value);
		updateSearchResultsRoute({ update_offset: value.toString() });
	};

	const handleOrderByChange = (
		e: SingleValue<{ value: string; label: string }>,
	) => {
		if (e) {
			setOrderByField(e.value);
			setInputOrderByField(e);
			setOffset(0);
			updateSearchResultsRoute({ order_field: e.value });
		}
	};

	const handleOrderChange = (
		e: SingleValue<{ value: string; label: string }>,
	) => {
		if (e) {
			setOrder(e.value);
			setInputOrder(e);
			setOffset(0);
			updateSearchResultsRoute({ update_order: e.value });
		}
	};

	const reactSelectMultiCss:
		| ClassNamesConfig<
				{
					value: string;
					label: string;
				},
				true,
				GroupBase<{
					value: string;
					label: string;
				}>
		  >
		| undefined = {
		control: () => {
			return 'appearance-none bg-beige-200 border border-[var(--fallback-bc,oklch(var(--bc)/0.2))] !min-h-10 w-full rounded-none px-2 py-0 text-base focus:outline focus:outline-[3px] focus:outline-offset-0 focus:outline-sage-300 disabled:border-solid disabled:border-gray-400 disabled:border-opacity-40';
		},
		menu: () => {
			return 'bg-base-100 text-base';
		},
		menuList: () => {
			return 'border border-sage-300 p-2';
		},
		multiValue: () => {
			return 'bg-beige-50 border border-[var(--fallback-bc,oklch(var(--bc)/0.2))] ';
		},
		multiValueLabel: () => {
			return 'py-1 px-2';
		},
		multiValueRemove: () => {
			return ' p-1 border-l border-l-sage-200 hover:bg-red-200';
		},
		option: ({ isFocused }) => {
			return `p-1 border-b border-b-sage-300 ${isFocused ? 'bg-sage-200' : ''}`;
		},
		placeholder: () => {
			return 'text-gray-500';
		},
	};

	const reactSelectCss: ClassNamesConfig<
		{
			value: string;
			label: string;
		},
		false,
		GroupBase<{
			value: string;
			label: string;
		}>
	> = {
		control: () => {
			return 'appearance-none bg-beige-200 border border-[var(--fallback-bc,oklch(var(--bc)/0.2))] !min-h-10 w-full rounded-none px-2 py-0 text-base focus:outline focus:outline-[3px] focus:outline-offset-0 focus:outline-sage-300 disabled:border-solid disabled:border-gray-400 disabled:border-opacity-40';
		},
		menu: () => {
			return 'bg-base-100 text-base';
		},
		menuList: () => {
			return 'border border-sage-300 p-2';
		},
		option: ({ isFocused }) => {
			return `p-1 border-b border-b-sage-300 ${isFocused ? 'bg-sage-200' : ''}`;
		},
		placeholder: () => {
			return 'text-gray-500';
		},
	};

	//Esse bloco de código aqui serve pra fazer o scroll do container de resultados de busca para o topo toda vez que a lista de posts é atualizada.
	const divRef = useRef<HTMLDivElement>(null);
	const scrollDivToTopOnChildlistChange = (
		mutationsList: MutationRecord[],
		observer: MutationObserver,
	) => {
		for (const mutation of mutationsList) {
			(mutation.target as HTMLElement).scrollTo(0, 0);
			observer.disconnect();
			break;
		}
	};
	if (divRef.current) {
		const observer = new MutationObserver(scrollDivToTopOnChildlistChange);
		observer.observe(divRef.current, {
			childList: true,
		});
	}

	return (
		<div className='flex flex-col sm:max-h-screen'>
			<Legend id='criterios-de-busca' className='mb-0'>
				Pesquisar:{' '}
			</Legend>
			<div className='flex flex-col gap-y-1 p-2'>
				<form onSubmit={submitSearch}>
					<div className='grid grid-cols-2 gap-2 md:grid-cols-6 lg:grid-cols-13'>
						<div className='col-span-2 md:col-span-3 lg:col-span-4'>
							<label htmlFor='pesquisa-titulo' className='label my-1 py-0'>
								Título
							</label>
							<input
								id='pesquisa-titulo'
								className={
									'input input-bordered h-10 w-full rounded-none px-2 focus:outline focus:outline-[3px] focus:outline-offset-0 focus:outline-sage-300 disabled:border-solid disabled:border-gray-400 disabled:border-opacity-40 disabled:text-gray-400'
								}
								value={inputTitle}
								onInput={(e) => {
									setInputTitle(e.currentTarget.value);
								}}
							/>
						</div>
						<div className='col-span-2 md:col-span-3 lg:col-span-4'>
							<label htmlFor='pesquisa-tags' className='label my-1 py-0'>
								Tags
							</label>
							{tags && (
								<Select
									classNames={reactSelectMultiCss}
									instanceId={'pesquisa-tags'}
									value={inputTags}
									onChange={(e) => {
										setInputTags(e);
									}}
									components={{
										ClearIndicator: ({
											innerProps: { ref, ...restInnerProps },
										}) => (
											<div
												ref={ref}
												{...restInnerProps}
												className='mr-2 border p-1 hover:bg-red-200'
												style={{
													borderColor:
														'var(--fallback-bc,oklch(var(--bc)/0.2))',
												}}
											>
												<Trash2 className='size-4' />
											</div>
										),
										IndicatorSeparator: () => (
											<div className='h-full border-l border-secondary border-opacity-20 pr-2' />
										),
										NoOptionsMessage: () => (
											<div className='p-2 text-center text-base'>
												Nenhum encontrado.
											</div>
										),
									}}
									id='pesquisa-tags'
									options={tags}
									unstyled
									isMulti
									isClearable
									placeholder='Selecione: '
								/>
							)}
						</div>
						<div className='col-span-1 md:col-span-2 lg:col-span-2'>
							<label htmlFor='pesquisa-data-inicio' className='label my-1 py-0'>
								Data inicial
							</label>
							<input
								id='pesquisa-data-inicio'
								className={
									'input input-bordered h-10 w-full rounded-none px-2 focus:outline focus:outline-[3px] focus:outline-offset-0 focus:outline-sage-300 disabled:border-solid disabled:border-gray-400 disabled:border-opacity-40 disabled:text-gray-400'
								}
								type='date'
								value={inputStartDate}
								onInput={(e) => setInputStartDate(e.currentTarget.value)}
							/>
						</div>
						<div className='col-span-1 md:col-span-2 lg:col-span-2'>
							<label htmlFor='pesquisa-data-fim' className='label my-1 py-0'>
								Data final
							</label>
							<input
								id='pesquisa-data-fim'
								className={
									'input input-bordered h-10 w-full rounded-none px-2 focus:outline focus:outline-[3px] focus:outline-offset-0 focus:outline-sage-300 disabled:border-solid disabled:border-gray-400 disabled:border-opacity-40 disabled:text-gray-400'
								}
								type='date'
								value={inputEndDate}
								onInput={(e) => setInputEndDate(e.currentTarget.value)}
							/>
						</div>
						<button
							type='submit'
							className='btn btn-primary col-span-2 mt-7 md:col-span-2 lg:col-span-1'
						>
							Pesquisar
						</button>
					</div>
					<div
						className='grid gap-2 md:grid-cols-3 lg:grid-cols-5'
						id='controles-inferiores'
					>
						<div className='col-span-1'>
							<label htmlFor='ordenar-por' className='label my-1 py-0'>
								Ordenar por
							</label>
							<Select
								id='ordenar-por'
								instanceId={'ordenar-por'}
								classNames={reactSelectCss}
								value={inputOrderByField}
								options={inputOrderByFieldOptions}
								unstyled
								isSearchable={false}
								onChange={handleOrderByChange}
							/>
						</div>
						<div className='col-span-1'>
							<label htmlFor='ordem-asc-desc' className='label my-1 py-0'>
								Ordem
							</label>
							<Select
								id='ordem-asc-desc'
								instanceId={'ordem-asc-desc'}
								classNames={reactSelectCss}
								value={inputOrder}
								options={inputOrderOptions}
								unstyled
								isSearchable={false}
								onChange={handleOrderChange}
							/>
						</div>
						<div className='col-span-1'>
							<label htmlFor='itens-por-pagina' className='label my-1 py-0'>
								Itens por página
							</label>
							<Select
								id='itens-por-pagina'
								instanceId={'itens-por-pagina'}
								classNames={reactSelectCss}
								value={inputLimit}
								options={inputLimitOptions}
								unstyled
								isSearchable={false}
								onChange={handleLimitChange}
							/>
						</div>
						<div className='mt-8 flex items-center justify-center gap-x-1 md:col-span-3 lg:col-span-2'>
							<button
								type='button'
								className='w-8 border border-[var(--fallback-bc,oklch(var(--bc)/0.2))] bg-beige-200 p-1 disabled:opacity-50'
								onClick={() => handleOffsetChange(0)}
								disabled={offset === 0}
							>
								{'<<'}
							</button>
							<button
								type='button'
								className='w-8 border border-[var(--fallback-bc,oklch(var(--bc)/0.2))] bg-beige-200 p-1 disabled:opacity-50'
								onClick={() => handleOffsetChange(offset - 1)}
								disabled={offset === 0}
							>
								{'<'}
							</button>
							<span className='flex items-center gap-1 px-2'>
								Página{' '}
								<strong className=''>
									{offset + 1} de {maxOffset + 1}
								</strong>
							</span>
							<button
								type='button'
								className='w-8 border border-[var(--fallback-bc,oklch(var(--bc)/0.2))] bg-beige-200 p-1 disabled:opacity-50'
								onClick={() => handleOffsetChange(offset + 1)}
								disabled={offset === maxOffset}
							>
								{'>'}
							</button>
							<button
								type='button'
								className='w-8 border border-[var(--fallback-bc,oklch(var(--bc)/0.2))] bg-beige-200 p-1 disabled:opacity-50'
								onClick={() => handleOffsetChange(maxOffset)}
								disabled={offset === maxOffset}
							>
								{'>>'}
							</button>
						</div>
					</div>
				</form>
			</div>
			{tags.length == 0 && posts.length == 0 && !failedSearch && (
				<SearchResultsLoading />
			)}
			<div
				id='resultados-da-busca'
				ref={divRef}
				className='m-2 border border-sage-300 bg-beige-200 sm:overflow-auto'
			>
				{posts && <SearchResultsTable posts={posts} />}
				{failedSearch && (
					<div className='flex h-[140px] items-center justify-center text-2xl font-semibold'>
						Nenhum resultado encontrado.
					</div>
				)}
			</div>
		</div>
	);
}
