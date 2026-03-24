export default {
	preset: 'ts-jest',
	testEnvironment: 'jest-environment-jsdom',
	setupFilesAfterEnv: ['<rootDir>/src/setupTests.ts'],
	moduleNameMapper: {
		// Handles CSS imports and image imports which Jest can't read
		'\\.(css|less|scss|sass)$': 'identity-obj-proxy',
		'\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$':
			'<rootDir>/__mocks__/fileMock.js',
		'^@/(.*)$': '<rootDir>/src/$1',
	},
};
