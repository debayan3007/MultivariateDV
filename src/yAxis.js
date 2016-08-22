yAxis.prototype = Object.create(Axis.prototype);
yAxis.prototype.constructor = yAxis;

function yAxis(ObjectRecieve) {
	ObjectRecieve.axisBoolean = 'y';
	Axis.call(this, ObjectRecieve);
}