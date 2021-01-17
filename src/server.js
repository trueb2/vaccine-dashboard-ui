import sirv from 'sirv';
import polka from 'polka';
import compression from 'compression';
import * as sapper from '@sapper/server';
import { json } from 'body-parser';
import session from 'express-session';
import sessionFileStore from 'session-file-store';

const { PORT, NODE_ENV } = process.env;
const dev = NODE_ENV === 'development';

const FileStore = new sessionFileStore(session);

const app = polka();

app.use(
		json(),
		session({
			secret: '777660CE-4B49-4A4D-B456-9E869E69EE52',
			resave: true,
			saveUninitialized: true,
			cookie: {
				maxAge: 31536000,
			},
			store: new FileStore({
				path: '.sessions'
			})
		}),
		compression({ threshold: 0 }),
		sirv('static', { dev }),
		sapper.middleware({
			session: (req, res) => {
				return ({
					token: req.session.token
				})
			}
		})
	)
	.listen(PORT, err => {
		if (err) console.log('error', err);
	});
