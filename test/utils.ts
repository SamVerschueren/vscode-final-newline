import * as assert from 'assert';
import * as tempfile from 'tempfile';
import * as mkdirp from 'mkdirp';
import * as utils from 'vscode-test-utils';
import {
	Position,
	window,
	workspace,
	WorkspaceEdit
} from 'vscode';

export function create(
	insertFinalNewline: boolean = true,
	file: string = tempfile('.txt')
) {
	return {
		file,
		saveText: async (text: string) => {
			const doc = await createDoc(file, '');
			const edit = new WorkspaceEdit();
			edit.insert(doc.uri, new Position(0, 0), text);
			assert.strictEqual(
				await workspace.applyEdit(edit),
				true,
				'applies edit'
			);
			return await new Promise<string>(resolve => {
				workspace.onDidSaveTextDocument(savedDoc => {
					resolve(savedDoc.getText());
				});

				doc.save();
			});
		}
	};

	async function createDoc(filepath: string, contents: string = '') {
		const filename = await utils.createFile(contents, filepath);
		const doc = await workspace.openTextDocument(filename);
		const config = workspace.getConfiguration('files');
		await config.update('insertFinalNewline', insertFinalNewline, true);
		await window.showTextDocument(doc);
		return doc;
	}

	async function mkdir(dir) {
		return new Promise((resolve, reject) => {
			mkdirp(dir, err => {
				if (err) {
					reject(err);
					return;
				}

				resolve();
			});
		});
	}
}
