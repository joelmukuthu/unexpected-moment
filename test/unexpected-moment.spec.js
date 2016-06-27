var sinon = require('sinon'),
    moment = require('moment-timezone'),
    unexpected = require('unexpected'),
    unexpectedMoment = require('../lib/unexpected-moment');

describe('unexpected-moment', function () {
    var expect = unexpected.clone()
        .use(unexpectedMoment);

    var clock;

    before(function () {
        clock = sinon.useFakeTimers();

        moment.tz.add('Europe/Copenhagen|CET CEST|-10 -20|0101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010|-2azC0 Tz0 VuO0 60q0 WM0 1fA0 1cM0 1cM0 1cM0 S00 1HA0 Nc0 1C00 Dc0 1Nc0 Ao0 1h5A0 1a00 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1fA0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1fA0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1fA0 1o00 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00');
        moment.tz.setDefault('Europe/Copenhagen');
    });

    after(function () {
        clock.restore();
    });

    describe('to be a moment', function () {
        it('passes if the subject is a moment instance', function () {
            expect(moment(), 'to be a moment');
        });

        it('throws the correct error if the subject is not a moment instance', function () {
            expect(function () {
                expect('not moment', 'to be a moment');
            }, 'to error with', 'expected \'not moment\' to be a moment');
        });
    });

    describe('not to be a moment', function () {
        it('does not falsely identify a date instance as a moment instance', function () {
            expect(new Date(), 'not to be a moment');
        });

        it('throws the correct error if the subject is a moment instance', function () {
            expect(function () {
                expect(moment('2016-01-01'), 'not to be a moment');
            }, 'to error with', 'expected moment(2016-01-01T00:00:00.000+01:00) not to be a moment');
        });
    });

    describe('to equal', function () {
        it('passes if the moments are equal', function () {
            expect(moment(1), 'to equal', moment(1));
        });

        it('passes if the value is a clone of the subject', function () {
            var m = moment();
            expect(m, 'to equal', m.clone());
        });

        it('allows specifying granularity as the fourth parameter', function () {
            expect(moment(1), 'to equal', moment(0), 'second');
        });

        it('allows specifying granularity as a readable label', function () {
            expect(moment(1), 'to equal', moment(0), 'in years');
        });

        it('throws the correct error if the assertion fails', function () {
            expect(
                function () {
                    expect(moment('2016-01-01'), 'to equal', moment('2016-01-02'));
                },
                'to error with',
                'expected moment(2016-01-01T00:00:00.000+01:00)\n' +
                'to equal moment(2016-01-02T00:00:00.000+01:00)\n' +
                '\n' +
                '-moment(2016-01-01T00:00:00.000+01:00)\n' +
                '+moment(2016-01-02T00:00:00.000+01:00)'
            );
        });

        it('throws the correct error if the value is not a moment object', function () {
            expect(
                function () {
                    expect(moment('2016-01-01'), 'to equal', '2016-01-01');
                },
                'to error with',
                'Unknown assertion <moment> to equal <string>\n' +
                '\n' +
                'Did you mean <moment> to satisfy <string>?'
            );
        });

        it('throws the correct error if the assertion fails and granularity is provided', function () {
            expect(
                function () {
                    expect(moment('2016-01-01'), 'to equal', moment('2016-01-02'), 'in milliseconds');
                },
                'to error with',
                'expected moment(2016-01-01T00:00:00.000+01:00)\n' +
                'to equal moment(2016-01-02T00:00:00.000+01:00) in milliseconds\n' +
                '\n' +
                '-moment(2016-01-01T00:00:00.000+01:00)\n' +
                '+moment(2016-01-02T00:00:00.000+01:00)'
            );
        });
    });

    describe('not to equal', function () {
        it('passes if the moments are not equal', function () {
            expect(moment(0), 'not to equal', moment(1));
        });

        it('throws the correct error if the assertion fails', function () {
            expect(
                function () {
                    expect(moment('2016-01-01'), 'not to equal', moment('2016-01-01'));
                },
                'to error with',
                'expected moment(2016-01-01T00:00:00.000+01:00)\n' +
                'not to equal moment(2016-01-01T00:00:00.000+01:00)'
            );
        });
    });

    describe('to satisfy', function () {
        it('passes if the two moments are equal', function () {
            expect(moment('2016-01-01'), 'to satisfy', moment('2016-01-01'));
        });

        it('passes if the value is a clone of the subject', function () {
            var aMoment = moment('2016-01-01');
            expect(aMoment, 'to satisfy', aMoment.clone());
        });

        it('passes if passed an ISO-formatted string as the expected value', function () {
            expect(moment('2016-01-01'), 'to satisfy', '2016-01-01T00:00:00+01:00');
        });

        it('passes if passed an array as the expected value', function () {
            expect(moment('2016-01-01'), 'to satisfy', [2016, 0, 1, 0, 0, 0, 0]);
        });

        it('passes if passed an object as the expected value', function () {
            expect(moment('2016-01-01'), 'to satisfy', { year: 2016, month: 0, day: 1, hour: 0, minute: 0, second: 0, millisecond: 0 });
        });

        it('passes with a partial object', function () {
            expect(moment('2016-01-01'), 'to satisfy', { year: 2016, date: 1, seconds: 0 });
        });

        it('throws if passed an empty object as the value', function () {
            expect(function () {
                expect(moment('2016-01-01'), 'to satisfy', {});
            }, 'to error');
        });

        it('throws if passed an objet with unknown keys', function () {
            expect(function () {
                expect(moment('2016-01-01'), 'not to satisfy', {
                    years: 2016,
                    mints: 0
                });
            }, 'to error');
        });

        it('passes if passed a number as the expected value', function () {
            expect(moment(123456), 'to satisfy', 123456);
        });


        it('passes if passed a Date as the expected value', function () {
            expect(moment('2016-01-01 00:00:01'), 'to satisfy', new Date('2016-01-01 00:00:01'));
        });

        // see: https://github.com/moment/moment/issues/2633
        it('throws for utc moments if the expected value is not a moment instance even though it represents the same moment', function () {
            expect(function () {
                expect(moment.utc('2015-01-01T00:00:00+00:00'), 'not to satisfy', [2015, 0, 1, 0, 0, 0, 0]);
            }, 'to error');
        });

        it('throws the correct error if the assertion fails for a string value', function () {
            expect(
                function () {
                    expect(moment('2016-01-01'), 'to satisfy', '2016-01-02');
                },
                'to error with',
                'expected moment(2016-01-01T00:00:00.000+01:00)\n' +
                'to satisfy \'2016-01-02\'\n' +
                '\n' +
                '-2016-01-01\n' +
                '+2016-01-02'
            );
        });

        it('throws the correct error if the assertion fails for an array value', function () {
            expect(
                function () {
                    expect(moment('2016-01-01'), 'to satisfy', [2016, 0, 2]);
                },
                'to error with',
                'expected moment(2016-01-01T00:00:00.000+01:00)\n' +
                'to satisfy \'2016-01-02\'\n' +
                '\n' +
                '-[ 2016, 0, 1 ]\n' +
                '+[ 2016, 0, 2 ]'
            );
        });

        it('throws the correct error if the assertion fails for an object value', function () {
            expect(
                function () {
                    expect(moment('2016-01-01'), 'to satisfy', { year: 2016, month: 0, date: 2, minute: 10, millisecond: 3 });
                },
                'to error with',
                'expected moment(2016-01-01T00:00:00.000+01:00)\n' +
                'to satisfy \'2016-01-02\'\n' +
                '\n' +
                '-{ year: 2016, month: 0, day: 1, minute: 0, second: 0, millisecond: 0 }\n' +
                '+{ year: 2016, month: 0, date: 2, minute: 10, millisecond: 3 }'
            );
        });

        it('throws the correct error if the assertion fails for a unix timestamp (seconds)', function () {
            expect(
                function () {
                    expect(moment('2016-01-01'), 'to satisfy', 1451689200);
                },
                'to error with',
                'expected moment(2016-01-01T00:00:00.000+01:00)\n' +
                'to satisfy \'2016-01-02\'\n' +
                '\n' +
                '-1451602800\n' +
                '+1451689200'
            );
        });

        it('throws the correct error if the assertion fails for a unix timestamp (milliseconds)', function () {
            expect(
                function () {
                    expect(moment('2016-01-01'), 'to satisfy', 1451689200000);
                },
                'to error with',
                'expected moment(2016-01-01T00:00:00.000+01:00)\n' +
                'to satisfy \'2016-01-02\'\n' +
                '\n' +
                '-1451602800000\n' +
                '+1451689200000'
            );
        });

        it('throws the correct error if the assertion fails for a Date value', function () {
            expect(
                function () {
                    expect(moment('2016-01-01'), 'to satisfy', new Date('2016-01-02'));
                },
                'to error with',
                'expected moment(2016-01-01T00:00:00.000+01:00)\n' +
                'to satisfy \'2016-01-02\'\n' +
                '\n' +
                '-new Date(\'2016-01-01\')\n' +
                '+new Date(\'2016-01-02\')'
            );
        });
    });

    describe('not to satisfy', function () {
        it('passes if the moments are not equal', function () {
            expect(moment(0), 'not to satisfy', moment(1));
        });

        it('throws the correct error if the assertion fails', function () {
            expect(
                function () {
                    expect(moment('2016-01-01'), 'not to satisfy', moment('2016-01-01'));
                },
                'to error with',
                'expected moment(2016-01-01T00:00:00.000+01:00)\n' +
                'not to satisfy moment(2016-01-01T00:00:00.000+01:00)'
            );
        });
    });

    describe('to be before', function () {
        it('passes if the value occurs before the subject', function () {
            expect(moment(0), 'to be before', moment(1));
        });

        it('throws the correct error if the assertion fails', function () {
            expect(
                function () {
                    expect(moment('2016-01-03'), 'to be before', new Date('2016-01-02 00:00:00'));
                },
                'to error with',
                'expected moment(2016-01-03T00:00:00.000+01:00)\n' +
                'to be before new Date(\'Fri, 01 Jan 2016 23:00:00 GMT\')'
            );
        });
    });

    describe('not to be before', function () {
        it('passes if the value does not occur before the subject', function () {
            expect(moment(1), 'not to be before', moment(0));
        });

        it('throws the correct error if the assertion fails', function () {
            expect(
                function () {
                    expect(moment('2016-01-01'), 'not to be before', '2016-01-02 00:00:00');
                },
                'to error with',
                'expected moment(2016-01-01T00:00:00.000+01:00)\n' +
                'not to be before \'2016-01-02 00:00:00\''
            );
        });
    });

    describe('to be after', function () {
        it('passes if the value occurs after the subject', function () {
            expect(moment(1), 'to be after', moment(0));
        });

        it('throws the correct error if the assertion fails', function () {
            expect(
                function () {
                    expect(moment('2016-01-01'), 'to be after', [2016, 0, 2, 0, 0, 0]);
                },
                'to error with',
                'expected moment(2016-01-01T00:00:00.000+01:00) ' +
                'to be after [ 2016, 0, 2, 0, 0, 0 ]'
            );
        });
    });

    describe('not to be after', function () {
        it('passes if the value does not occur after the subject', function () {
            expect(moment(0), 'not to be after', moment(1));
        });

        it('throws the correct error if the assertion fails', function () {
            expect(
                function () {
                    expect(moment('2016-01-02'), 'not to be after', { year: 2016, month: 0, day: 1, hour: 0, minute: 0, second: 0, millisecond: 0 });
                },
                'to error with',
                'expected moment(2016-01-02T00:00:00.000+01:00) ' +
                'not to be after\n' +
                '{\n' +
                '  year: 2016, month: 0, day: 1, hour: 0, minute: 0, second: 0,\n' +
                '  millisecond: 0\n' +
                '}'
            );
        });
    });

    describe('to be same or before', function () {
        it('passes if the value occurs before the subject', function () {
            expect(moment(0), 'to be same or before', moment(1));
        });

        it('passes if the value is the same as the subject', function () {
            expect(moment(0), 'to be same or before', moment(0));
        });

        it('throws the correct error if the assertion fails', function () {
            expect(
                function () {
                    expect(moment('2016-01-01'), 'to be same or before', 1451602800); // 1451602800 -> new Date('2016-01-01 00:00:00')
                },
                'to error with',
                'expected moment(2016-01-01T00:00:00.000+01:00) ' +
                'to be same or before 1451602800'
            );
        });
    });

    describe('not to be same or before', function () {
        it('passes if the value does not occur before the subject', function () {
            expect(moment(1), 'not to be same or before', moment(0));
        });

        it('throws the correct error if the assertion fails', function () {
            expect(
                function () {
                    expect(moment('2016-01-01'), 'not to be same or before', 1451689200000); // 1451689200000 -> new Date('2016-01-02 00:00:00')
                },
                'to error with',
                'expected moment(2016-01-01T00:00:00.000+01:00)\n' +
                'not to be same or before 1451689200000'
            );
        });
    });

    describe('to be same or after', function () {
        it('passes if the value occurs after the subject', function () {
            expect(moment(1), 'to be same or after', moment(0));
        });

        it('passes if the value is the same as the subject', function () {
            expect(moment(0), 'to be same or after', moment(0));
        });

        it('throws the correct error if the assertion fails', function () {
            expect(
                function () {
                    expect(moment('2016-01-01'), 'to be same or after', new Date('2016-01-02 00:00:00'));
                },
                'to error with',
                'expected moment(2016-01-01T00:00:00.000+01:00)\n' +
                'to be same or after new Date(\'Fri, 01 Jan 2016 23:00:00 GMT\')'
            );
        });
    });

    describe('not to be same or after', function () {
        it('passes if the value does not occur after the subject', function () {
            expect(moment(0), 'not to be same or after', moment(1));
        });

        it('throws the correct error if the assertion fails', function () {
            expect(
                function () {
                    expect(moment('2016-01-02'), 'not to be same or after', moment('2016-01-01 00:00:00'));
                },
                'to error with',
                'expected moment(2016-01-02T00:00:00.000+01:00)\n' +
                'not to be same or after moment(2016-01-01T00:00:00.000+01:00)'
            );
        });
    });

    describe('to be between', function () {
        it('passes if the subject occurs between the two values', function () {
            expect(moment(1), 'to be between', moment(0), moment(2));
        });

        it('throws the correct error if the assertion fails', function () {
            expect(
                function () {
                    expect(moment('2016-01-01'), 'to be between', moment('2016-01-02'), moment('2016-01-03'));
                },
                'to error with',
                'expected moment(2016-01-01T00:00:00.000+01:00)\n' +
                'to be between moment(2016-01-02T00:00:00.000+01:00) and moment(2016-01-03T00:00:00.000+01:00)'
            );
        });
    });

    describe('not to be between', function () {
        it('passes if the subject does not occur between the two values', function () {
            expect(moment(0), 'not to be between', moment(1), new Date(2));
        });

        it('throws the correct error if the assertion fails', function () {
            expect(
                function () {
                    expect(moment('2016-01-02'), 'not to be between', moment('2016-01-01'), moment('2016-01-03'));
                },
                'to error with',
                'expected moment(2016-01-02T00:00:00.000+01:00)\n' +
                'not to be between moment(2016-01-01T00:00:00.000+01:00) and moment(2016-01-03T00:00:00.000+01:00)'
            );
        });
    });

    describe('to be inclusively between', function () {
        it('passes if the subject is the same as the first value', function () {
            expect(moment(0), 'to be inclusively between', moment(0), moment(1));
        });

        it('passes if the subject is the same as the second value', function () {
            expect(moment(1), 'to be inclusively between', moment(0), moment(1));
        });

        it('passes if the subject occurs betwen the two values', function () {
            expect(moment(1), 'to be inclusively between', moment(0), moment(2));
        });

        it('passes if the two values are the same', function () {
            expect(moment(0), 'to be inclusively between', moment(0), moment(0));
        });

        it('throws the correct error if the assertion fails', function () {
            expect(
                function () {
                    expect(moment('2016-01-02'), 'to be inclusively between', new Date('2016-01-01 00:00:00'), new Date('2016-01-01 12:00:00'));
                },
                'to error with',
                'expected moment(2016-01-02T00:00:00.000+01:00)\n' +
                'to be inclusively between new Date(\'Thu, 31 Dec 2015 23:00:00 GMT\') ' +
                'and new Date(\'Fri, 01 Jan 2016 11:00:00 GMT\')'
            );
        });
    });

    describe('not to be inclusively between', function () {
        it('passes if the subject is neither the same as the first value or the second, nor does it occur between them', function () {
            expect(moment(0), 'not to be inclusively between', moment(1), moment(1));
        });

        it('throws the correct error if the assertion fails', function () {
            expect(
                function () {
                    expect(moment('2016-01-02'), 'not to be inclusively between', moment('2016-01-02'), moment('2016-01-02'));
                },
                'to error with',
                'expected moment(2016-01-02T00:00:00.000+01:00)\n' +
                'not to be inclusively between moment(2016-01-02T00:00:00.000+01:00) ' +
                'and moment(2016-01-02T00:00:00.000+01:00)'
            );
        });
    });

    describe('when formatted with', function () {
        it('formats a moment with the provided format and delegates to the next assertion', function () {
            expect(moment(1), 'when formatted with', 'YYYY', 'to be', '1970');
        });

        it('formats a moment with the default format if called with an empty string format', function () {
            expect(moment.utc(0), 'when formatted with', '', 'to equal', '1970-01-01T00:00:00Z');
        });
    });

    describe('to be the start of', function () {
        it('start of second', function () {
            expect(moment('2016-01-01 00:00:01+01:00'), 'to be the start of second');
        });

        it('start of minute', function () {
            expect(moment('2016-01-01 00:01:00+01:00'), 'to be the start of minute');
        });

        it('start of hour', function () {
            expect(moment('2016-01-01 01:00:00+01:00'), 'to be the start of hour');
        });

        it('start of day', function () {
            expect(moment('2016-01-02 00:00:00+01:00'), 'to be the start of day');
        });

        it('start of week', function () {
            expect(moment('2016-01-03 00:00:00+01:00'), 'to be the start of week');
        });

        it('start of isoWeek', function () {
            expect(moment('2016-01-04 00:00:00+01:00'), 'to be the start of isoWeek');
        });

        it('start of month', function () {
            expect(moment('2016-01-01 00:00:00+01:00'), 'to be the start of month');
        });

        it('start of quarter', function () {
            expect(moment('2016-01-01 00:00:00+01:00'), 'to be the start of quarter');
        });

        it('start of year', function () {
            expect(moment('2016-01-01 00:00:00+01:00'), 'to be the start of year');
        });

        it('throws the correct error if the assertion fails', function () {
            expect(
                function () {
                    expect(moment('2016-01-02'), 'to be the start of year');
                },
                'to error with',
                'expected moment(2016-01-02T00:00:00.000+01:00) ' +
                'to be the start of year\n' +
                '\n' +
                '-moment(2016-01-02T00:00:00.000+01:00)\n' +
                '+moment(2016-01-01T00:00:00.000+01:00)'
            );
        });

        it('does not mutate the moment objects', function () {
            var startOfDay = moment('2016-01-02T00:00:00.000+01:00');
            expect(startOfDay, 'to be the start of day');
            expect(startOfDay.format(), 'to be', '2016-01-02T00:00:00+01:00');
        });
    });

    describe('not to be the start of', function () {
        it('passes if the passed moment is not start of the unit of time provided', function () {
            expect(moment('2016-01-01 00:00:01.002+01:00'), 'not to be the start of second');
        });

        it('throws the correct error if the assertion fails', function () {
            expect(
                function () {
                    expect(moment('2016-01-02'), 'not to be the start of day');
                },
                'to error with',
                'expected moment(2016-01-02T00:00:00.000+01:00) ' +
                'not to be the start of day'
            );
        });
    });

    describe('to be the end of', function () {
        it('end of second', function () {
            expect(moment('2016-01-01 00:00:01.999+01:00'), 'to be the end of second');
        });

        it('end of minute', function () {
            expect(moment('2016-01-01 00:01:59.999+01:00'), 'to be the end of minute');
        });

        it('end of hour', function () {
            expect(moment('2016-01-01 01:59:59.999+01:00'), 'to be the end of hour');
        });

        it('end of day', function () {
            expect(moment('2016-01-02 23:59:59.999+01:00'), 'to be the end of day');
        });

        it('end of week', function () {
            expect(moment('2016-01-09 23:59:59.999+01:00'), 'to be the end of week');
        });

        it('end of isoWeek', function () {
            expect(moment('2016-01-10 23:59:59.999+01:00'), 'to be the end of isoWeek');
        });

        it('end of month', function () {
            expect(moment('2016-01-31 23:59:59.999+01:00'), 'to be the end of month');
        });

        it('end of quarter', function () {
            expect(moment('2016-03-31 23:59:59.999+02:00'), 'to be the end of quarter');
        });

        it('end of year', function () {
            expect(moment('2016-12-31 23:59:59.999+01:00'), 'to be the end of year');
        });

        it('throws the correct error if the assertion fails', function () {
            expect(
                function () {
                    expect(moment('2016-01-02'), 'to be the end of year');
                },
                'to error with',
                'expected moment(2016-01-02T00:00:00.000+01:00) ' +
                'to be the end of year\n' +
                '\n' +
                '-moment(2016-01-02T00:00:00.000+01:00)\n' +
                '+moment(2016-12-31T23:59:59.999+01:00)'
            );
        });

        it('does not mutate the moment objects', function () {
            var endOfYear = moment('2016-12-31T23:59:59.999+01:00');
            expect(endOfYear, 'to be the end of year');
            expect(endOfYear.format(), 'to be', '2016-12-31T23:59:59+01:00');
        });
    });

    describe('not to be the end of', function () {
        it('passes if the passed moment is not end of the unit of time provided', function () {
            expect(moment('2016-01-01 00:00:01.002+01:00'), 'not to be the end of second');
        });

        it('throws the correct error if the assertion fails', function () {
            expect(
                function () {
                    expect(moment('2016-01-02T23:59:59.999+01:00'), 'not to be the end of day');
                },
                'to error with',
                'expected moment(2016-01-02T23:59:59.999+01:00) ' +
                'not to be the end of day'
            );
        });
    });
});
