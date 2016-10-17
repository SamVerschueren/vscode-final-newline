import * as assert from 'assert';
import * as vscodeUtils from 'vscode-test-utils';
import * as utils from './utils';

suite('Final Newline Extension', () => {

	suiteTeardown(vscodeUtils.closeAllFiles);

	test('no insert final newline', async () => {
		const doc = await utils.create(false);

		assert.strictEqual(await doc.saveText('foo'), 'foo');
	});

	test('insert final newline', async () => {
		const doc = await utils.create();

		assert.strictEqual(await doc.saveText('foo'), 'foo\n');
	});
});
