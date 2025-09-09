import { client } from '$lib/sanity';
import type { PageServerLoad } from './$types';
import { error } from '@sveltejs/kit';

// Define a reusable type for linked categories and tags
interface ReferenceItem {
	name: string;
	slug: {
		current: string;
	};
}

// Update the Post interface
export interface Post {
	_id: string;
	title: string;
	date: string;
	content: any[]; // Portable Text array
	featuredMedia?: any;
	sticky?: boolean;
	categories?: ReferenceItem[];
	tags?: ReferenceItem[];
	estimatedReadingTime: number;
}

export const load: PageServerLoad = async ({ params }) => {
	const { slug } = params;

	const groqQuery = `*[_type == "post" && language == "nl" && slug.current == $slug][0]{
    ...,
    content[]{
      ...,
      _type == "image" => {
        ...,
        asset->
      }
    },
    categories[]->{
      name,
      slug
    },
    tags[]->{
      name,
      slug
    },
    "estimatedReadingTime": round(length(pt::text(content)) / 5 / 180 )
  }`;

	const post: Post = await client.fetch(groqQuery, { slug });

	if (!post) {
		error(404, 'Post not found');
	}

	return {
		post
	};
};
