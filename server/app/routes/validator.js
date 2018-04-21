class Validator {
  constructor(data, Model) {
    this.data = data;
    this.Model = Model;
  }

  // Only letters single name without spaces: ex: Pavel + trim() func
  setPersonName(name) {
    name = name.trim();
    const nameRegex = /^[a-zA-Z]{1,100}$/;

    if (!name.length || !name || (name.length > 100)) {
        throw new Error('Invalid name length');
    }

    if (name.match(nameRegex)) {
        return name;
    }
    throw new Error('Name includes symbols that are not allowed');
  }

  // basic email validation: ex: Pavel@mail.bg + trim() func
  setEmail(email) {
    email = email.trim();
    const emailRegex = (/^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/);

    if (!email.length || !email || (email.length > 100)) {
        throw new Error('Invalid email length');
    }

    if (email.match(emailRegex)) {
        return email;
    }
    throw new Error('Email includes symbols that are not allowed');
  }

  // Only letters multi word with spaces: ex: Ticket Not Started + trim() func
  // Labels, Roles, Statuses
  setParam(param) {
    param = param.trim();
    const alphaRegex = /^[a-zA-Z ]+$/;

    if (!param.length || !param || (param.length > 100)) {
        throw new Error('Parameter name is not valid');
    }

    if (param.match(alphaRegex)) {
        return param;
    }
    throw new Error('Please include only valid symbols in the parameter name');
  }

  // Include everything but check length: ex: njd123-[},?/!23 *^% + trim() func
  setDescription(description) {
    description = description.trim();

    if (!description.length
        || !description
        || (description.length > 8000)
    ) {
        throw new Error('Description is of invalid length');
    }

    return description;
  }

  // url for photoes: ex: https://pavelsummer2018.net + trim() func
  setPhoto(photo) {
    photo = photo.trim();
    const urlRegex = `/(ftp|http|https):\/\/(\w+:{0,1}
        \w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-\/]))?/`;

    if (!photo.length || !photo) {
        throw new Error('The cover image is not correct');
    }

    if (photo.match(urlRegex)) {
        return photo;
    }
    throw new Error('The cover image is not correct');
  }

  // naming different sections,models,topic etc: ex: whatever + trim() func
  setTitles(titles) {
    const titlesRegex = /^[a-zA-Z0-9]+([-_\.][a-zA-Z0-9]+)*[a-zA-Z0-9]$/;
    titles = titles.trim();

    if (!titles.length || !titles || (titles.length <= 3)
        || (titles.length > 30)) {
        throw new Error('Invalid titles length');
    }

    if (titles.match(titlesRegex)) {
        return titles;
    }
    throw new Error('titles includes symbols that are not allowed');
  }

  // setting passwords or titles allowing many symbols: ex: whatever (max: 32)
  setPassword(password) {
    const passwordRegex = `^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,32}$`;

    if (!password.length || !password || password.length > 32 ||
        password.length < 6) {
        throw new Error('Invalid password length!');
    }

    // delete return below to enable regex validations
    return password;
    if (password.match(passwordRegex)) {
      return password;
    }
    throw new Error('Invalid password symbols or format!');
  }
}

module.exports = Validator;
