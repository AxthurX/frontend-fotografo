import BackButton from '@/components/BackButton';

import FormContainer from '@/components/FormStructure/FormContainer';

import PostBody from '@/components/PostBody';
import { conselhos } from '@/lib/conselhos/advices';
import { notFound } from 'next/navigation';
import { polyfill } from 'interweave-ssr';

polyfill();

export const dynamic = 'force-dynamic';
export const dynamicParams = false;
export function generateStaticParams() {
	const params = [];
	for (const conselho of conselhos) {
		params.push({ conselho: conselho.slug });
	}
	return params;
}
const Conselhos = async ({
	params,
}: {
	params: { conselho: string };
}) => {
	const advices_data = conselhos.find(
		(conselho: { slug: string }) => conselho.slug === params.conselho,
	);
	const generatedParams = generateStaticParams();
	if (!generatedParams.some((param) => param.conselho === params.conselho)) {
		return notFound();
	}

	//const post = await getPost(`sedam-${params.conselho}`);



	return (
		<FormContainer className='relative flex grow flex-col'>
			<BackButton className='lg:top-10' />
			<section className='text-center text-5xl max-xl:text-4xl  max-md:text-3xl font-bold tracking-tighter md:px-4 border-t border-primary flex min-h-24 w-full items-center justify-center bg-calpolygreen-900 py-10 text-beige-50 '>
				{String(advices_data?.title).toUpperCase()}{' '}
				{advices_data &&
					advices_data.description?.length > 0 &&
					` - ${String(advices_data?.description)}`}
			</section>

			<PostBody
				params={{
					post_id: ` ${advices_data?.responsavel ? advices_data.responsavel : 'sedam'}-${params.conselho}`,
				}}
			/>
			{/* <PostBody params={{ post_id: ` sedam-${params.conselho}` }} /> */}
		</FormContainer>
	);
};

export default Conselhos;
