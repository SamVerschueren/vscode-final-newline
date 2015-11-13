'use strict';

import {window, workspace, extensions, Disposable, Position, WorkspaceConfiguration, ExtensionContext} from 'vscode';
import {EOL} from 'os';

export function activate(context: ExtensionContext) {
	const config = workspace.getConfiguration('files');

	const controller = new FinalNewLineController(config);

	context.subscriptions.push(controller);
}

class FinalNewLineController {

	private _disposable: Disposable;
	private _config: WorkspaceConfiguration;

	constructor(config) {
		this._config = config;

		let subscriptions: Disposable[] = [];

		workspace.onDidSaveTextDocument(this._onDocumentSaved, this, subscriptions);
		workspace.onDidChangeConfiguration(this._onConfigChanged, this, subscriptions);

		this._disposable = Disposable.from(...subscriptions);
	}

	dispose() {
		this._disposable.dispose();
	}

	private _onDocumentSaved() {
		if (this._config.get('insertFinalNewline', false) === true) {
			this._insertFinalNewline();
		}
	}

	private _onConfigChanged() {
		this._config = workspace.getConfiguration('files');
	}

	private _insertFinalNewline() {
		if (!window.activeTextEditor) {
			return;
		}

		const doc = window.activeTextEditor.document;

		const lastLine = doc.lineAt(doc.lineCount - 1);

		if (lastLine.isEmptyOrWhitespace === false) {
			window.activeTextEditor.edit(editBuilder => {
				editBuilder.insert(new Position(doc.lineCount - 1, lastLine.text.length), EOL);
			}).then(() => doc.save());
		}
	}
}
