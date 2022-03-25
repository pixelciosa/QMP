function strToArr(str, unique = true) {
    let arr = str.replaceAll(', ', ',').split(',');
    if (unique) {
        arr = [...new Set(arr)];
    }
    return arr;
}

function requiredParam(param) {
    throw new Error(param + " es obligatorio");
  }

function isObject(subject) {
	return typeof subject == "object";
}

function isArray(subject) {
	return Array.isArray(subject);
}

function deepCopy(subject) {
	let copySubject;

	const subjectIsObject = isObject(subject);
	const subjectIsArray = isArray(subject);

	if (subjectIsArray) {
		copySubject = [];
	} else if (subjectIsObject) {
		copySubject = {};
	} else {
		return subject;
	}

	for (const key in subject) {
		const keyIsObject = isObject(subject[key]);

		if (keyIsObject) {
			copySubject[key] = deepCopy(subject[key]);
		} else {
			if (subjectIsArray) {
				copySubject.push(subject[key]);
			} else {
				copySubject[key] = subject[key];
			}
		}
	}
	return copySubject;
}

function SuperObject() {}
SuperObject.isObject = function (subject) {
  return typeof subject == "object";
}
SuperObject.deepCopy = function (subject) {
  let copySubject;

  const subjectIsObject = isObject(subject);
  const subjectIsArray = isArray(subject);

  if (subjectIsArray) {
    copySubject = [];
  } else if (subjectIsObject) {
    copySubject = {};
  } else {
    return subject;
  }

  for (key in subject) {
    const keyIsObject = isObject(subject[key]);

    if (keyIsObject) {
      copySubject[key] = deepCopy(subject[key]);
    } else {
      if (subjectIsArray) {
        copySubject.push(subject[key]);
      } else {
        copySubject[key] = subject[key];
      }
    }
  }

  return copySubject;
}

function revertChanges(initialState, currentState) {
    for (const key in currentState) {
        if (currentState[key] !== initialState[key]) {
        currentState[key] = initialState[key];
        }
    }
}


export { strToArr, requiredParam, isObject, isArray, deepCopy, SuperObject, revertChanges } 