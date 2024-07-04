import * as vscode from 'vscode';
import { SidebarProvider } from './SidebarProvider';




export function activate(context: vscode.ExtensionContext) {

	const sidebarProvider = new SidebarProvider(context.extensionUri);
	context.subscriptions.push(
		vscode.window.registerWebviewViewProvider(
		"vscode-algoportal-sidebar",
		sidebarProvider
		)
	);

	context.subscriptions.push(
		vscode.commands.registerCommand('vscode-algoportal.debugError', () => {
			vscode.window.showInformationMessage("something", 'Yes', 'No', 'Cancel');
		})
	);

}

// this method is called when your extension is deactivated
export function deactivate() {}
