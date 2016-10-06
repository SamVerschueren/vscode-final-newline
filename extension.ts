'use strict';
import {
	workspace,
	Disposable,
	Position,
	WorkspaceConfiguration,
	ExtensionContext,
	TextDocumentWillSaveEvent,
	TextEdit
} from 'vscode';
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

		workspace.onWillSaveTextDocument(this._onWillDocumentSave, this, subscriptions);
		workspace.onDidChangeConfiguration(this._onConfigChanged, this, subscriptions);

		this._disposable = Disposable.from(...subscriptions);
	}

	dispose() {
		this._disposable.dispose();
	}

	private _onWillDocumentSave(e: TextDocumentWillSaveEvent) {
		if (this._config.get('insertFinalNewline', false) === true) {
			const doc = e.document;
			const lastLine = doc.lineAt(doc.lineCount - 1);

			if (lastLine.isEmptyOrWhitespace === false) {
				const edit = TextEdit.insert(new Position(doc.lineCount - 1, lastLine.text.length), EOL);

				e.waitUntil(Promise.resolve([
					edit
				]));
			}
		}
	}

	private _onConfigChanged() {
		this._config = workspace.getConfiguration('files');
	}
}
