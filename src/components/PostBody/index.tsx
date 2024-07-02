import { getPost } from '@/lib/getPost';
import { Markup } from 'interweave';
import { polyfill } from 'interweave-ssr';
import { Suspense } from 'react';

polyfill();

export default async function PostBody({
	params,
	title,
}: {
	params: { post_id: string };
	title?: string;
}) {
	const post = await getPost(params.post_id);
	

	return (
		<Suspense>
			{post ? (
				<section id={post.id}>
					{title && (
						<div className='h-24 w-full border border-sage-600 bg-calpolygreen-900 text-center text-beige-50'>
							<h3 className='mx-auto flex h-full w-full items-center justify-center text-center align-middle text-3xl font-semibold'>
								{title}
							</h3>
						</div>
					)}

					<div
						className='mx-auto mb-8 w-full max-w-[1200px] text-pretty max-[1200px]:mx-4 max-[1200px]:w-[calc(100%-2rem)] md:text-justify'
						lang='pt-BR'
					>
						<Markup
							className='mx-auto max-w-7xl px-10'
							content={post.content}
							allowAttributes={true}
							allowElements={true}
						/>
					</div>
				</section>
			) : null}
		</Suspense>
	);
}
