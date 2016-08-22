xAxis.prototype = Object.create(Axis.prototype);
xAxis.prototype.constructor = xAxis;

function xAxis(ObjectRecieve) {
	ObjectRecieve.axisBoolean = 'x';
	Axis.call(this, ObjectRecieve);
}