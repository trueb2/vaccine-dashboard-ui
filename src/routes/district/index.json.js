import db from '../../_database.js';

// export async function get(req, res, next) {

//     const { slug, } = req.params;

//     const districts = await db();

//     res.setHeader('Content-Type', 'application/json');
//     res.end(JSON.stringify(districts));
// }

import districts from './_districts.js';

const contents = JSON.stringify(districts.map(district => {
	return {
        slug: district.slug,
		name: district.name,
        vaccinated_visitors: district.vaccinated_visitors,
        unvaccinated_visitors: district.unvaccinated_visitors
	};
}));

export function get(req, res) {
	res.writeHead(200, {
		'Content-Type': 'application/json'
	});

	res.end(contents);
}