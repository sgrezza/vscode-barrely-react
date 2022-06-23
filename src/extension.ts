// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from "vscode";
import { writeBarrelFile } from "./writeFile";
// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {
  // Use the console to output diagnostic information (console.log) and errors (console.error)
  // This line of code will only be executed once when your extension is activated
  console.log('Congratulations, your extension "barrely-react" is now active!');

  // The command has been defined in the package.json file
  // Now provide the implementation of the command with registerCommand
  // The commandId parameter must match the command field in package.json
  let disposable = vscode.commands.registerCommand(
    "barrely-react.makeBarrel",
    (uri: vscode.Uri) => {
      // The code you place here will be executed every time your command is executed
      // Display a message box to the user
      vscode.window
        .showInputBox({
          prompt: "What's this new component gone be named?",
          title: "New Component Name",
          placeHolder: "NewComponent",
          value: "NewComponent",
        })
        .then(txt => {
          if (!txt) {
            return;
          }
          writeBarrelFile({ exportFrom: txt, path: uri.fsPath });
          //   vscode.window.showInformationMessage(JSON.stringify(uri));
          vscode.window.showInformationMessage("Created %s", txt);
        });

      //   "$mid":1,"fsPath":"/Users/sgrezza/dev/reactProjects/stapl-logger/src/components","external":"file:///Users/sgrezza/dev/reactProjects/stapl-logger/src/components","path":"/Users/sgrezza/dev/reactProjects/stapl-logger/src/components","scheme":"file"}
    }
  );

  context.subscriptions.push(disposable);
}

// this method is called when your extension is deactivated
export function deactivate() {}
