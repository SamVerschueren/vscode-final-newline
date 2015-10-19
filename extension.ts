'use strict';

import {window, workspace, extensions, Disposable, Position, ReadOnlyMemento} from 'vscode';
import {EOL} from 'os';

export function activate(disposables: Disposable[]) {
	const controller = new FinalNewLineController();

	disposables.push(controller);
}

class FinalNewLineController {

	private _disposable: Disposable;

	constructor() {
		let subscriptions: Disposable[] = [];

		// Subscribe to onSave
		workspace.onDidSaveTextDocument(this._onEvent, this, subscriptions);

		this._disposable = Disposable.of(...subscriptions);
	}

	dispose() {
		this._disposable.dispose();
	}

	private _onEvent() {
		extensions.getConfigurationMemento('files').getValue('insertFinalNewline', false)
			.then(insertFinalNewline => {
				if (insertFinalNewline === true) {
					this._insertNewline();
				}
			});
	}

	private _insertNewline() {
		const editor = window.getActiveTextEditor();
		if (!editor) {
			return;
		}

		const doc = editor.getTextDocument();
		const docContent = doc.getText();

		const lastLine = doc.getLineCount();
		const lastLineContent = doc.getTextOnLine(lastLine);

		if (lastLineContent.length !== 0) {
			editor.edit(editBuilder => {
				editBuilder.insert(new Position(lastLine, lastLineContent.length + 1), EOL);
			}).then(() => doc.save());
		}
	}
}
