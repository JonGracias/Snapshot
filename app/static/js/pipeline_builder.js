var groupCount = 0; // Keep track of the number of groups

function addGroup() {
  groupCount++; // Increment the group count

  var groupContainer = document.getElementById('groupContainer');

  // Create a new group container
  var newGroup = document.createElement('div');
  newGroup.className = 'group';

  // Create a line container for the group
  var lineContainer = document.createElement('div');
  lineContainer.className = 'lineContainer';

  // Add the line container to the group container
  newGroup.appendChild(lineContainer);

  // Create a button to add lines to the group
  var addLineButton = document.createElement('button');
  addLineButton.innerHTML = 'Add Line';
  addLineButton.addEventListener('click', function() {
    addLine(lineContainer);
  });

  // Append the elements to the group container
  newGroup.appendChild(addLineButton);

  // Add the new group to the group container
  groupContainer.appendChild(newGroup);
  groupContainer.appendChild(document.createElement('br')); // Add a line break
}

function addLine(lineContainer) {
  var lineCount = lineContainer.children.length;

  var newLine = document.createElement('div');
  newLine.className = 'line';

  var action = document.createElement('select');
  action.className = 'lineItem';

  var action1 = document.createElement('option');
  action1.value = 'count';
  action1.text = 'Count';

  var action2 = document.createElement('option');
  action2.value = 'reference';
  action2.text = 'Reference';

  var worksheet = document.createElement('select');
  worksheet.className = 'lineItem';

  var worksheet1 = document.createElement('option');
  worksheet1.value = 'worksheet';
  worksheet1.text = 'worksheet';

  var worksheet2 = document.createElement('option');
  worksheet2.value = 'worksheet';
  worksheet2.text = 'worksheet';

  action.appendChild(action1);
  action.appendChild(action2);
  worksheet.appendChild(worksheet1);
  worksheet.appendChild(worksheet2);

  var input1 = document.createElement('input');
  input1.className = 'lineItem';
  input1.type = 'text';
  input1.name = 'column';

  var input2 = document.createElement('input');
  input2.className = 'lineItem';
  input2.type = 'text';
  input2.name = 'searchItem' + lineCount;

  newLine.appendChild(action);
  newLine.appendChild(worksheet);
  newLine.appendChild(input1);
  newLine.appendChild(input2);

  lineContainer.appendChild(newLine);
  lineContainer.appendChild(document.createElement('br'));
}

function submit() {
  var groupElements = document.getElementsByClassName('group');

  for (var i = 0; i < groupElements.length; i++) {
    var lineContainer = groupElements[i].querySelector('.lineContainer');
    var lineElements = lineContainer.getElementsByClassName('line');

    console.log('Group ' + (i + 1) + ' submitted');

    for (var j = 0; j < lineElements.length; j++) {
      var action = lineElements[j].querySelector('select[name="action"]');
      var worksheet = lineElements[j].querySelector('select[name="worksheet"]');
      var input1 = lineElements[j].querySelector('input[name="column"]');
      var input2 = lineElements[j].querySelector('input[name^="searchItem"]');

      console.log('Line ' + (j + 1) + ':');
      console.log(action.value + ' ' + worksheet.value + ' ' + input1.value + ' ' + input2.value);
    }
  }
}
